import React, {useState} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';
import client from '../data/network/rest/client';

const ChattingScreen = ({navigation}) => {
  const [members, setMembers] = useState('');

  // 방 생성 함수
  const createRoom = async () => {
    const senderNickname = '핑크';

    console.log('??', members);
    try {
      const response = await client.users.createChattingRoom({
        senderNickname: senderNickname, // 발신자 닉네임 추가
        receiverNickname: members.split(','), // 수신자의 닉네임
      });

      if (response.data.success) {
        const roomId = response.data.roomId;
        console.log('채팅방 만들어질 때', roomId);
        Alert.alert('Success', 'Chat room created or retrieved successfully!', [
          {
            text: 'OK',
            onPress: () => navigation.navigate('ChatRoomScreen', {roomId}),
          },
        ]);
      } else {
        Alert.alert(
          'Error',
          response.data.message || 'Failed to create or retrieve chat room',
        );
      }
    } catch (error) {
      // Axios 에러 객체에서 추가 정보를 출력
      if (error.response) {
        // 서버 응답이 있을 경우
        console.error('Response error:', error.response.data);
        Alert.alert(
          'Error',
          error.response.data.message ||
            'Error creating or retrieving chat room',
        );
      } else if (error.request) {
        // 요청이 서버에 도달했으나 응답이 없을 경우
        console.error('Request error:', error.request);
        Alert.alert('Error', 'No response received from server');
      } else {
        // 요청을 생성하는 중에 에러가 발생했을 경우
        console.error('Axios error:', error.message);
        Alert.alert('Error', 'An error occurred while setting up the request');
      }
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
