import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import client from '../data/network/rest/client';

const ChatRoomScreen = ({route}) => {
  const {roomId} = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const userNickname = useSelector(state => state.user.profileNickname); // Get your profile name

  // Load messages from server
  const loadMessages = async () => {
    try {
      const response = await client.users.getMessages(roomId);
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

  // Send message
  const sendMessage = async () => {
    if (!newMessage.trim()) return;

    try {
      const senderNickname = userNickname; // Use your profile name
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
          isSent: true, // Indicate that this message was sent by the user
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

  // Transform messages for rendering
  const transformMessages = messagesObj => {
    return Object.keys(messagesObj).map(key => ({
      id: key,
      ...messagesObj[key],
      isSent: messagesObj[key].sender === userNickname, // Check if the sender is the user
      timestamp: messagesObj[key].timestamp || Date.now(),
    }));
  };

  useEffect(() => {
    loadMessages();
  }, []);

  // Render each message
  const renderItem = ({item}) => {
    return (
      <View
        style={{
          padding: 10,
          alignSelf: item.isSent ? 'flex-end' : 'flex-start', // Align based on sender
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
        <Button title="전송" onPress={sendMessage} />
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
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10, // Add some space between input and button
  },
});

export default ChatRoomScreen;
