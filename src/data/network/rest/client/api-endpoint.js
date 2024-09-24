import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_ENDPOINTS = {
  LOGIN: '/login',
  SIGN_UP: '/signup',
  BOARD: '/board',
  EMAIL_SEND_CODE: '/email-verification/send-code',
  PROFILE: 'profile',
  PATCH_PROFILE_IMAGE: 'profile/image',
  PATCH_PROFILE_BIO:'profile/bio',
  CREATE_CHATTING_ROOM: 'chat/rooms', // 쪽지방 생성
  SEND_MESSAGE: 'chat/rooms', // 메시지 추가
  GET_MESSAGES: 'chat/rooms', // 메시지 가져오기  PROFILE: '/profile',
  COMMENTS: postId => `/board/${postId}/comments`,
  COMMENT_REPLIES: (postId, commentId) =>
    `/post/${postId}/comments/${commentId}/replies`,
  COMMENT_DETAIL: (postId, commentId) =>
    `/board/${postId}/comments/${commentId}`,
};