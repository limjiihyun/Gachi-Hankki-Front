import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import client from '../data/network/rest/client';
import {useSelector} from 'react-redux';

const ChattingScreen = ({navigation}) => {
  const [members, setMembers] = useState('');
  const [rooms, setRooms] = useState([]); // 방 목록 상태 추가
  const userNickname = useSelector(state => state.user.profileNickname); // Get the user's nickname from Redux state

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
  }, []);

  const goToChatRoom = roomId => {
    navigation.navigate('ChatRoomScreen', {roomId});
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
      <Text style={styles.roomsTitle}>Rooms:</Text>
      <FlatList
        data={rooms}
        keyExtractor={item => item.roomId}
        renderItem={({item}) => {
          const otherMembers = item.members.filter(
            member => member !== userNickname,
          );
          return (
            <TouchableOpacity onPress={() => goToChatRoom(item.roomId)}>
              <View style={styles.roomItem}>
                <Text style={styles.roomMembers}>
                  Members: {otherMembers.join(', ') || 'No other members'}
                </Text>
                <Text style={styles.roomLastMessage}>
                  Last Message: {item.lastMessage || 'No messages yet'}
                </Text>
                <Text style={styles.roomLastUpdated}>
                  Last Updated: {item.lastUpdated}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No rooms available.</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  roomsTitle: {
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold',
  },
  roomItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
    backgroundColor: '#ffffff',
    borderRadius: 5,
    marginBottom: 10,
  },
  roomMembers: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  roomLastMessage: {
    color: 'gray',
  },
  roomLastUpdated: {
    color: 'lightgray',
    fontSize: 12,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'gray',
  },
});

export default ChattingScreen;
