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
import client from '../data/network/rest/client';
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

    const messagesRef = firebase
      .database()
      //.limitToFirst(10)
      .ref(`ChatRooms/${roomId}/messages`);
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

      //setNewMessage(''); // 입력 필드 비우기
      flatListRef.current?.scrollToEnd({animated: true}); // 화면을 아래로 스크롤
    } catch (error) {
      console.error('메시지 전송 실패:', error);
      Alert.alert('Error', '메시지 전송 실패');
    }
  };

  useEffect(() => {
    if (!roomId) return;
    const messagesRef = firebase.database().ref(`ChatRooms/${roomId}/messages`);
    //.limitToLast(10);
    messagesRef.on('child_added', handleNewMessage);

    return () => {
      messagesRef.off('child_added', handleNewMessage);
    };
  }, [roomId, handleNewMessage]);

  const fetchMoreMessages = async () => {
    if (isFetchingMore || !lastMessageKey) return;

    setIsFetchingMore(true);

    try {
      const messagesRef = firebase
        .database()
        .ref(`ChatRooms/${roomId}/messages`)
        .orderByKey()
        .endAt(lastMessageKey)
        .limitToLast(10);

      const snapshot = await messagesRef.once('value');
      const newMessages = [];

      snapshot.forEach(childSnapshot => {
        if (childSnapshot.exists()) {
          newMessages.push({
            id: childSnapshot.key,
            ...childSnapshot.val(),
            isSent: childSnapshot.val().sender === userNickname,
          });
        }
      });

      if (newMessages.length > 0) {
        setMessages(prevMessages => [
          ...newMessages.reverse(), // Add older messages at the top
          ...prevMessages,
        ]);
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
