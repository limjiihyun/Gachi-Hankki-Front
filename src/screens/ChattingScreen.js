import React, {useState} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';
import client from '../data/network/rest/client';

const ChattingScreen = ({navigation}) => {
  const [members, setMembers] = useState(''); // 멤버를 입력하는 상태 변수

  // 방 생성 함수
  const createRoom = async () => {
    try {
      const response = await client.users.createChattingRoom({
        members: members.split(','), // 멤버를 배열 형태로 전송
      });

      if (response.data.success) {
        Alert.alert('Success', 'Chat room created successfully!', [
          {text: 'OK'},
        ]);
      } else {
        Alert.alert('Error', 'Failed to create chat room');
      }
    } catch (error) {
      console.error('Error creating chat room:', error);
      Alert.alert('Error', 'An error occurred while creating the chat room');
    }
  };

  return (
    <View style={{padding: 20}}>
      <Text>Enter members (comma-separated):</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 20,
        }}
        placeholder="e.g., member1,member2,member3"
        onChangeText={text => setMembers(text)}
        value={members}
      />
      <Button title="Create Chat Room" onPress={createRoom} />
    </View>
  );
};

export default ChattingScreen;
