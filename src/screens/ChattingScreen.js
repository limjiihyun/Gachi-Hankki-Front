import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, Button, Alert, FlatList, TouchableOpacity} from 'react-native';
import client from '../data/network/rest/client';

const ChattingScreen = ({navigation}) => {
  const [members, setMembers] = useState('');
  const [rooms, setRooms] = useState([]); // 방 목록 상태 추가

  // 방 생성 함수
  const createRoom = async () => {

    try {
      const response = await client.users.createChattingRoom({
        receiverNickname: members, // 수신자의 닉네임
      });

      const roomId = response.data.roomId;

      if (response.data.success) {
        Alert.alert('Success', 'Chat room created successfully!', [
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
      if (error.response) {
        const errorMessage =
          error.response.data.message ||
          'An error occurred while processing your request.';
        Alert.alert('Error', errorMessage); 
      } else if (error.request) {
        console.error('Request error:', error.request);
        Alert.alert('Error', 'No response received from server');
      } else {
        console.error('Axios error:', error.message);
        Alert.alert('Error', 'An error occurred while setting up the request');
      }
    }
  };
  // 방 목록 가져오는 함수
  const fetchRooms = async () => {
    try {
      const response = await client.users.getRooms(); // API 호출
      if (response.data.success) {
        console.log('방 목록', response.data);
        setRooms(Object.values(response.data.rooms)); // 성공 시 방 목록 업데이트
      } else {
        Alert.alert('Error', 'Failed to fetch rooms');
      }
    } catch (error) {
      if (error.response) {
        Alert.alert(
          'Error',
          error.response.data.message || 'Failed to fetch rooms',
        );
      } else if (error.request) {
        Alert.alert('Error', 'No response received from server');
      } else {
        Alert.alert('Error', 'An error occurred while setting up the request');
      }
    }
  };
  // 컴포넌트가 마운트될 때 방 목록 가져오기
  useEffect(() => {
    fetchRooms();
  }, []); // 빈 배열로 설정하여 마운트될 때 한 번만 실행

  const goToChatRoom = roomId => {
    navigation.navigate('ChatRoomScreen', {roomId}); // Pass roomId for navigation
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
      {/* 방 목록 출력 */}
      <Text style={{marginTop: 20}}>Rooms:</Text>
      <FlatList
        data={rooms}
        keyExtractor={room => room.roomId} // Use roomId as the key
        renderItem={({item}) => (
          <TouchableOpacity onPress={() => goToChatRoom(item.roomId)}>
            <View
              style={{
                padding: 10,
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
              }}>
              <Text>Room ID: {item.roomId}</Text>
              <Text>Last Message: {item.lastMessage}</Text>
              <Text>Last Updated: {item.lastUpdated}</Text>
              <Text>Members: {item.members.join(', ')}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text>No rooms available.</Text>}
      />
    </View>
  );
};

export default ChattingScreen;
