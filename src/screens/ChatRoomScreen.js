import React, {useEffect, useState, useRef, useCallback} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Alert,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useSelector} from 'react-redux';
import colors from '../constants/colors/colors';
import CHARACTER_IMAGE from '../constants/data/character-image';
import ProfileModal from '../components/ProfileModal';
import {firebase} from '@react-native-firebase/app';
import ChatRoomStyle from '../styles/ChatRoomStyle';
import MessageItem from '../components/MessageItem';

const ChatRoomScreen = ({route}) => {
  const {roomId} = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const userNickname = useSelector(state => state.user.profileNickname);
  const [otherUserProfileImage, setOtherUserProfileImage] = useState(null);
  const [otherUserNickname, setOtherUserNickname] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const flatListRef = useRef(null);
  const [lastMessageKey, setLastMessageKey] = useState(null);

  const handleNewMessage = useCallback(
    snapshot => {
      const newMessage = {
        id: snapshot.key,
        ...snapshot.val(),
        isSent: snapshot.val().sender === userNickname,
      };

      setMessages(prevMessages => {
        if (!prevMessages.some(msg => msg.id === newMessage.id)) {
          return [...prevMessages, newMessage];
        }
        return prevMessages;
      });
    },
    [userNickname],
  );

  const sendMessage = async () => {
    if (!newMessage.trim()) return; // 빈 메시지 방지

    const messagesRef = firebase.database().ref(`ChatRooms/${roomId}/messages`);
    const lastMessagesRef = firebase
      .database()
      .ref(`ChatRooms/${roomId}/lastMessage`);
    const lastUpdatedRef = firebase
      .database()
      .ref(`ChatRooms/${roomId}/lastUpdated`);
    const timestamp = new Date().toISOString(); // ISO 포맷으로 현재 시간 저장

    try {
      // 메시지를 messagesRef에 푸시
      await messagesRef.push({
        sender: userNickname,
        text: newMessage,
        timestamp,
      });
      setNewMessage('');

      // 마지막 메시지와 마지막 업데이트 시간을 방 정보에 각각 업데이트
      await lastMessagesRef.set(newMessage); // 마지막 메시지 텍스트만 저장
      await lastUpdatedRef.set(timestamp); // 마지막 업데이트 시간 저장

      flatListRef.current?.scrollToEnd({animated: true}); // 화면을 아래로 스크롤
    } catch (error) {
      console.error('메시지 전송 실패:', error);
      Alert.alert('Error', '메시지 전송 실패');
    }
  };

  //firebase 채팅방에서 새 메시지를 수신하고 새메시지가 추가되면 구성요소를 업데이트
  // 구성요소가 마운트 해제되거나 채팅방이 변경될 때 메모리 누수를 방지하기 위해
  // 리스너가 적절하게 정리되도록 함.
  useEffect(() => {
    // roomId가 있는지 확인
    if (!roomId) return;
    // firebase 참조 설정
    const messagesRef = firebase.database().ref(`ChatRooms/${roomId}/messages`);

    // child_add 이벤트 구독
    messagesRef.on('child_added', handleNewMessage);

    //리스너 정리
    return () => {
      messagesRef.off('child_added', handleNewMessage);
    };
  }, [roomId, handleNewMessage]);

  const fetchMoreMessages = async () => {
    // 현재 메시지를 불러오는 중이면, 중복된 요청을 방지하기 위해 실행 중지
    // lastMessageKey가 없다면, 더이상 불러올 메시지가 없다는 뜻
    if (isFetchingMore || !lastMessageKey) return;

    // 메시지를 사져오는 중임을 나타냄 -> 로딩 인디케이터 표시할 때 유용
    setIsFetchingMore(true);

    try {
      // firebase 쿼리 설정
      const messagesRef = firebase
        .database()
        .ref(`ChatRooms/${roomId}/messages`)
        .orderByKey()
        .endAt(lastMessageKey)
        .limitToStart(10);

      // 데이터 가져오기
      // once('value')는 한번만 데이터를 가져오는 요청을 보냅니다.
      const snapshot = await messagesRef.once('value');
      const newMessages = [];

      // 가져온 메시지 처리
      // snapshot.forEach() : snapshot에 포함된 각 메시지를 순회하면서처리
      snapshot.forEach(childSnapshot => {
        // 메시지가 존재하는지 확인
        if (childSnapshot.exists()) {
          newMessages.push({
            //각 메시지의 고유한 id를 가져옴
            id: childSnapshot.key,
            // 메시지의 데이터 가져옴(보낸사람, 메시지 내용)
            ...childSnapshot.val(),
            // 해당 메시지가 현재 사용자가 보낸 메시지인지 확인하는 필드
            isSent: childSnapshot.val().sender === userNickname,
          });
        }
      });

      // 상태 업데이트
      if (newMessages.length > 0) {
        // 새로운 메시지가 있다면 메시지 목록 업데이트
        setMessages(prevMessages => [
          // 새로 가져온 메시지를 역순으로 정렬하여 상단에 추가
          ...newMessages.reverse(),
          ...prevMessages,
        ]);
        // 가장 오래된 메시지의 id를 lastMessageKey로 설정하여, 다음번에 이전 메시지를 불러올 떄 기준
        setLastMessageKey(newMessages[0]?.id || null);
      }
    } catch (error) {
      console.error('Error loading older messages:', error);
      Alert.alert('Error', 'Failed to load more messages');
    } finally {
      setIsFetchingMore(false);
    }
  };

  const handleScroll = event => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY <= 0 && !isFetchingMore) {
      fetchMoreMessages(); // Trigger fetching more messages when scrolled to the top
    }
  };

  useEffect(() => {
    if (roomId) {
      fetchMoreMessages(); // Initial fetch
    }
  }, [roomId]);

  useEffect(() => {
    const messagesRef = firebase.database().ref(`ChatRooms/${roomId}/messages`);
    messagesRef.on('child_added', handleNewMessage);

    return () => {
      messagesRef.off('child_added', handleNewMessage);
    };
  }, [roomId, handleNewMessage]);

  const renderItem = ({item}) => {
    return (
      <MessageItem
        item={item}
        otherUserNickname={otherUserNickname}
        otherUserProfileImage={otherUserProfileImage}
        //goToUserProfile={goToUserProfile}
      />
    );
  };

  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({animated: true});
    }
  }, [messages]);

  return (
    <View style={{flex: 1, backgroundColor: colors.white}}>
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        style={{marginTop: 10}}
        onContentSizeChange={() =>
          flatListRef.current?.scrollToEnd({animated: true})
        }
        onScroll={handleScroll}
        scrollEventThrottle={16}
        ListFooterComponent={
          isFetchingMore ? (
            <ActivityIndicator size="large" color={colors.primary} />
          ) : null
        }
      />
      <View style={ChatRoomStyle.inputContainer}>
        <TextInput
          style={ChatRoomStyle.input}
          placeholder="메시지를 입력하세요"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity
          style={ChatRoomStyle.sendButton}
          onPress={sendMessage}>
          <Text style={ChatRoomStyle.sendButtonText}>전송</Text>
        </TouchableOpacity>
      </View>
      <ProfileModal
        isVisible={isModalVisible}
        //selectedProfile={selectedProfile}
        closeProfileModal={() => setModalVisible(false)}
      />
    </View>
  );
};

export default ChatRoomScreen;
