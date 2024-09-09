import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_ENDPOINTS = {
  LOGIN: '/login',
  SIGN_UP: '/signup',
  BOARD: '/board',
  EMAIL_SEND_CODE: '/email-verification/send-code',
  CREATE_CHATTING_ROOM: '/rooms',
  PROFILE: '/profile',
};
export const getProfileEndpoint = async () => {
  const token = await AsyncStorage.getItem('AccessToken');
  return `/profile/${token}`;
};
