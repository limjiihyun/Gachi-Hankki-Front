import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_ENDPOINTS = {
  LOGIN: '/login',
  SIGN_UP: '/signup',
  BOARD: '/board',
  EMAIL_SEND_CODE: '/email-verification/send-code',
  CREATE_CHATTING_ROOM: '/rooms',
  PROFILE: '/profile',
  COMMENTS: postId => `/board/${postId}/comments`,
  COMMENT_REPLIES: (postId, commentId) =>
    `/post/${postId}/comments/${commentId}/replies`,
  COMMENT_DETAIL: (postId, commentId) => 
    `/board/${postId}/comments/${commentId}`,
};
export const getProfileEndpoint = async () => {
  const token = await AsyncStorage.getItem('AccessToken');
  return `/profile/${token}`;
};
