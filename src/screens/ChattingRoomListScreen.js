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
  ActivityIndicator,
} from 'react-native';
import client from '../data/network/rest/client';
import {useSelector} from 'react-redux';
import colors from '../constants/colors/colors';

const ChattingRoomListScreen = ({navigation}) => {
  //const [members, setMembers] = useState('');
  const [rooms, setRooms] = useState([]); // 방 목록 상태 추가
  const [loading, setLoading] = useState(true);
  const userNickname = useSelector(state => state.user.profileNickname);

  // 방 목록 가져오는 함수
  const fetchRooms = async () => {
    try {
      const response = await client.users.getRooms(); // API 호출
      if (response.data.success) {
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
    } finally {
      setLoading(false); // 로딩 상태 끄기
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const goToChatRoom = roomId => {
    navigation.navigate('ChatRoomScreen', {roomId});
  };

  return (
    <View style={{padding: 20, backgroundColor: colors.white, height: '100%'}}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
        // 방 목록 출력
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
                    {otherMembers.join(', ') || '나와의 채팅'}
                  </Text>
                  <Text style={styles.roomLastMessage}>
                    {item.lastMessage || 'No messages yet'}
                  </Text>
                  <Text style={styles.roomLastUpdated}>{item.lastUpdated}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          ListEmptyComponent={
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.white,
                height: '100%',
              }}>
              <Text style={styles.emptyText}>
                아직 참여중인 채팅방이 없습니다.
              </Text>
            </View>
          }
        />
      )}
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
    fontWeight: '700',
    color: colors.grey800,
  },
  roomLastMessage: {
    color: colors.grey700,
    marginTop: 10,
  },
  roomLastUpdated: {
    color: colors.grey400,
    fontSize: 12,
    marginTop: 10,
  },
  emptyText: {
    fontSize: 14,
    color: colors.grey400,
  },
});

export default ChattingRoomListScreen;
