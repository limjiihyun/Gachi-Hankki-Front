import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Image,
  Alert,
} from 'react-native';
import client from '../data/network/rest/client';
import {useSelector} from 'react-redux';
import colors from '../constants/colors/colors';
import {firebase} from '@react-native-firebase/app';
import {useFocusEffect} from '@react-navigation/native';

const ChattingRoomListScreen = ({navigation}) => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const userNickname = useSelector(state => state.user.profileNickname);

  useFocusEffect(
    React.useCallback(() => {
      fetchRooms();
    }, []),
  );

  // 방 목록 가져오는 함수
  const fetchRooms = async () => {
    try {
      const response = await client.users.getRooms(); 

      if (response.data.success) {
        const updatedRooms = Object.values(response.data.rooms).filter(
          room => room.members.includes(userNickname), 
        );

        updatedRooms.forEach(room => {
          const roomRef = firebase.database().ref(`ChatRooms/${room.roomId}`);
          roomRef.on('value', snapshot => {
            const roomData = snapshot.val();
            setRooms(prevRooms => {
              const roomIndex = prevRooms.findIndex(
                r => r.roomId === room.roomId,
              );
              if (roomIndex !== -1) {
                const updatedPrevRooms = [...prevRooms];
                updatedPrevRooms[roomIndex] = {
                  ...updatedPrevRooms[roomIndex],
                  lastMessage: roomData.lastMessage || 'No messages yet',
                };
                return updatedPrevRooms;
              } else {
                return prevRooms;
              }
            });
          });
        });

        setRooms(updatedRooms); 
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

  const goToChatRoom = roomId => {
    navigation.navigate('ChatRoomScreen', {roomId});
  };

  return (
    <View
      style={{
        paddingHorizontal: 16,
        backgroundColor: colors.white,
        height: '100%',
      }}>
      <Image
        source={require('../assets/banner2.png')}
        style={{width: '100%', height: 90, borderRadius: 8}}
      />
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} />
      ) : (
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
