import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, FlatList, Alert} from 'react-native';
import client from '../data/network/rest/client'; // API 클라이언트

const ChatRoomScreen = ({route}) => {
  const {roomId} = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  // 메시지 불러오기
  const loadMessages = async () => {
    try {
      const response = await client.users.getMessages(roomId); // roomId를 그대로 사용
      console.log('Room ID:', roomId); // roomId가 올바르게 전달되고 있는지 확인

      if (response.data.success) {
        console.log('gd', response.data);
        const messagesArray = transformMessages(response.data.messages || {});
        setMessages(messagesArray);
      } else {
        Alert.alert(
          'Error',
          response.data.message || 'Failed to load messages',
        );
      }
    } catch (error) {
      console.error('Error loading messages:', error);
      Alert.alert('Error', 'An error occurred while loading messages');
    }
  };

  // 메시지 전송
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const response = await client.users.sendMessage(roomId, {
        text: newMessage,
      });
      if (response.data.success) {
        console.log('채팅 입력 성공', response);

        // 메시지 상태를 즉시 업데이트
        setMessages(prevMessages => [
          ...prevMessages,
          {id: Date.now().toString(), text: newMessage}, // 새로운 메시지를 리스트에 추가
        ]);
        setNewMessage(''); // 입력 필드 초기화
      } else {
        Alert.alert('Error', 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      Alert.alert('Error', 'An error occurred while sending the message');
    }
  };

  // 메시지 변환 함수
  const transformMessages = messagesObj => {
    return Object.keys(messagesObj).map(key => ({
      id: key,
      ...messagesObj[key],
    }));
  };

  useEffect(() => {
    loadMessages(); // 컴포넌트가 마운트되면 메시지 불러오기
  }, []);

  return (
    <View style={{flex: 1, padding: 20}}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={{padding: 10}}>
            <Text>{item.text}</Text>
          </View>
        )}
      />
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
        }}
        placeholder="Enter your message"
        value={newMessage}
        onChangeText={setNewMessage}
      />
      <Button title="Send" onPress={sendMessage} />
    </View>
  );
};

export default ChatRoomScreen;
