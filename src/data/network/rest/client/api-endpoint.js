import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_ENDPOINTS = {
  LOGIN: '/login',
  SIGN_UP: '/signup',
  BOARD: '/board',
  EMAIL_SEND_CODE: '/email-verification/send-code',
  PROFILE: 'profile',
  PATCH_PROFILE_IMAGE: 'profile/image',
  PATCH_PROFILE_BIO: 'profile/bio',
  CREATE_CHATTING_ROOM: '/rooms', // 쪽지방 생성
  SEND_MESSAGE: '/rooms', // 메시지 추가
  GET_MESSAGES: '/rooms', // 메시지 가져오기
  GET_ROOM: '/rooms',
  COMMENTS: postId => `/board/${postId}/comments`,
  DELETE_COMMENTS: (postId, commentId) =>
    `/board/${postId}/comments/${commentId}`,
  REPORT_POST: postId => `/board/${postId}/report`,
  REPORT_COMMENT: (postId, commentId) =>
    `/board/${postId}/comments/${commentId}/report`,
  REPORT_REPLY: (postId, commentId, replyId) =>
    `/board/${postId}/comments/${commentId}/replies/${replyId}/report`,

  COMMENT_DETAIL: (postId, commentId) =>
    `/board/${postId}/comments/${commentId}`,
  GET_USER_PROFILE: roomId => `/rooms/${roomId}/profile`,  // 상대방 프로필 조회 엔드포인트

};
