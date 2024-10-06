import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Alert,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import client from '../data/network/rest/client';
import colors from '../constants/colors/colors';
import CHARACTER_IMAGE from '../constants/data/character-image';
import ProfileModal from '../components/ProfileModal';

const ChatRoomScreen = ({route}) => {
  const {roomId} = route.params;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const userNickname = useSelector(state => state.user.profileNickname);
  const [otherUserProfileImage, setOtherUserProfileImage] = useState(null);
  const [otherUserNickname, setOtherUserNickname] = useState('');
  const [otherUserBio, setOtherUserBio] = useState('');
  const [otherUserDepartment, setOtherUserDepartment] = useState('');

  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null); 

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

  const [profileData, setProfileData] = useState(null);

  const loadUserProfile = async () => {
    try {
      const profileData = await client.users.getUserProfile(roomId);
      const profileImage = CHARACTER_IMAGE.find(
        image => image.id === profileData.profile.profileImageNumber,
      );

      setOtherUserProfileImage(
        profileImage ? profileImage.src : require('../assets/character/1.png'),
      );
      setOtherUserNickname(profileData.profile.nickname);
      setOtherUserBio(profileData.profile.bio);
      setOtherUserDepartment(profileData.profile.department);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };
  const renderProfileImage = () => {
    if (profileData) {
      return (
        <View style={{marginTop: 10}}>
          <Image
            source={profileData.profileImage}
            style={{width: 30, height: 30}}
          />
        </View>
      );
    }
    return null;
  };

  const goToUserProfile = () => {
    if (otherUserProfileImage && otherUserNickname) {
      setSelectedProfile({
        profileImage: otherUserProfileImage,
        nickname: otherUserNickname,
        bio: otherUserBio, 
        department: otherUserDepartment, 
      });
      setModalVisible(true); 
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
    loadUserProfile();
  }, []);

  const renderItem = ({item}) => {
    return (
      <View
        style={{
          flexDirection: item.isSent ? 'row-reverse' : 'row',
          alignItems: 'center',
          marginVertical: 5,
          paddingHorizontal: 8,
        }}>
        {/* 다른 사용자의 메시지와 프로필 이미지, 닉네임을 렌더링 */}
        {!item.isSent && otherUserProfileImage && (
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={goToUserProfile}>
              <Image
                source={otherUserProfileImage}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 24,
                  marginTop: 20,
                  marginRight: 10,
                }}
              />
            </TouchableOpacity>
            <View>
              <Text style={{marginBottom: 5}}>{otherUserNickname}</Text>
              <View
                style={{
                  padding: 10,
                  backgroundColor: colors.grey200,
                  borderRadius: 10,
                }}>
                <Text>{item.text}</Text>
              </View>
            </View>
          </View>
        )}

        {/* 현재 사용자의 메시지를 렌더링 */}
        {item.isSent && (
          <View
            style={{
              padding: 10,
              backgroundColor: colors.lightOrange,
              borderRadius: 10,
            }}>
            <Text>{item.text}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        style={{marginTop: 10}}
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
      <ProfileModal
        isVisible={isModalVisible}
        selectedProfile={selectedProfile}
        closeProfileModal={() => setModalVisible(false)}
      />
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
