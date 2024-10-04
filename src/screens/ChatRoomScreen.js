import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import client from '../data/network/rest/client';
import colors from '../constants/colors/colors';

const ChatRoomScreen = ({route}) => {
  const {roomId} = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const userNickname = useSelector(state => state.user.profileNickname);

  const loadMessages = async () => {
    try {
      const response = await client.users.getMessages(roomId);
      console.log('bb', response.data);
      if (response.data.success) {
        const messagesArray = transformMessages(response.data.messages || {});
        messagesArray.sort(
          (a, b) => new Date(a.timestamp) - new Date(b.timestamp),
        );
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

  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const senderNickname = userNickname;
      const response = await client.users.sendMessage(
        roomId,
        senderNickname,
        newMessage,
      );

      if (response.data.success) {
        const messageToSend = {
          id: Date.now().toString(),
          text: newMessage,
          sender: senderNickname,
          timestamp: Date.now(),
          isSent: true,
        };

        setMessages(prevMessages => [...prevMessages, messageToSend]);
        setNewMessage('');
      } else {
        Alert.alert('Error', 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      if (error.response) {
        Alert.alert(
          'Error',
          `An error occurred while sending the message: ${error.response.data.message}`,
        );
      } else {
        Alert.alert('Error', 'An error occurred while sending the message');
      }
    }
  };

  const transformMessages = messagesObj => {
    return Object.keys(messagesObj).map(key => ({
      id: key,
      ...messagesObj[key],
      isSent: messagesObj[key].sender === userNickname,
      timestamp: messagesObj[key].timestamp || Date.now(),
    }));
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          padding: 10,
          marginHorizontal: 10,
          alignSelf: item.isSent ? 'flex-end' : 'flex-start',
          backgroundColor: item.isSent ? '#d1e7dd' : '#f8d7da',
          borderRadius: 10,
          marginVertical: 5,
          maxWidth: '80%',
        }}>
        <Text>{item.text}</Text>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="메시지를 입력하세요"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>전송</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: 'lightgray',
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: colors.lightBrown,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  sendButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ChatRoomScreen;
