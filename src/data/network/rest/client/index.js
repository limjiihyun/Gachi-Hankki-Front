import {HttpClient} from './http-client';
import {API_ENDPOINTS} from './api-endpoint';

class Client {
  users = {
    login: async userData => {
      const response = await HttpClient.post(API_ENDPOINTS.LOGIN, userData);
      if (response.status === 200) {
        await HttpClient.setAuthorization(response.data.accessToken);
      }
      return response;
    },
    signUp: async userData => HttpClient.post(API_ENDPOINTS.SIGN_UP, userData),
    createBoard: async data =>
      HttpClient.post(API_ENDPOINTS.BOARD, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
    me: async () => await HttpClient.get(API_ENDPOINTS.USERS_ME),
    refresh: async refresh =>
      HttpClient.post(API_ENDPOINTS.REFRESH_TOKEN, {
        refresh,
      }),
    getBoard: async data => HttpClient.get(API_ENDPOINTS.BOARD, data),
    emailSendCode: async data =>
      HttpClient.post(API_ENDPOINTS.EMAIL_SEND_CODE, data),
    createProfile: async data => {
      try {
        const response = await HttpClient.post(API_ENDPOINTS.PROFILE, data);
        return response;
      } catch (error) {
        throw error;
      }
    },
    getProfile: async data => HttpClient.get(API_ENDPOINTS.PROFILE, data),
    patchProfileImage: async data =>
      HttpClient.patch(API_ENDPOINTS.PATCH_PROFILE_IMAGE, data),
    patchProfileBio: async data =>
      HttpClient.patch(API_ENDPOINTS.PATCH_PROFILE_BIO, data),
    createChattingRoom: async data =>
      HttpClient.post(API_ENDPOINTS.CREATE_CHATTING_ROOM, data),
    // 메시지 보내기 API
    sendMessage: async (roomId, senderNickname, text) =>
      HttpClient.post(`${API_ENDPOINTS.SEND_MESSAGE}/${roomId}/messages`, {
        senderNickname,
        text,
      }),

    // 특정 방의 메시지 불러오기 API
    getMessages: async roomId =>
      HttpClient.get(`${API_ENDPOINTS.GET_MESSAGES}/${roomId}/messages`),

    // // 메시지 보내기 API
    // sendMessage: async (roomId, message) =>
    //   HttpClient.post(
    //     `${API_ENDPOINTS.CREATE_CHATTING_ROOM}/${roomId}/messages`,
    //     {message},
    //   ),

    // // 특정 방의 메시지 불러오기 API
    // getMessages: async roomId =>
    //   HttpClient.get(
    //     `${API_ENDPOINTS.CREATE_CHATTING_ROOM}/${roomId}/messages`,
    //   ),
    addComment: async (postId, commentData) => {
      try {
        const response = await HttpClient.post(
          API_ENDPOINTS.COMMENTS(postId),
          commentData,
        );
        return response;
      } catch (error) {
        throw error;
      }
    },

    getComments: async postId => {
      try {
        const response = await HttpClient.get(API_ENDPOINTS.COMMENTS(postId));
        return response;
      } catch (error) {
        throw error;
      }
    },
    getSingleComment: async (postId, commentId) => {
      try {
        const response = await HttpClient.get(
          `${API_ENDPOINTS.COMMENT_DETAIL(postId, commentId)}`,
        );
        return response;
      } catch (error) {
        if (error.response) {
          // error.response가 정의되어 있으면 상태 코드와 메시지를 출력
          console.error(
            `댓글 조회 실패: ${error.response.status} - ${error.response.statusText}`,
          );
        } else {
          // error.response가 없으면 에러 메시지만 출력
          console.error(`댓글 조회 실패: ${error.message}`);
        }
        throw error; // 에러를 상위 호출 스택으로 던짐
      }
    },
    deleteComment: async (postId, commentId) => {
      try {
        const response = await HttpClient.delete(
          `${API_ENDPOINTS.COMMENTS(postId)}/${commentId}`,
        );
        return response;
      } catch (error) {
        throw error;
      }
    },

    addReply: async (postId, commentId, replyData) => {
      try {
        const response = await HttpClient.post(
          API_ENDPOINTS.COMMENT_REPLIES(postId, commentId),
          replyData,
        );
        return response;
      } catch (error) {
        throw error;
      }
    },

    getReplies: async (postId, commentId) => {
      try {
        const response = await HttpClient.get(
          API_ENDPOINTS.COMMENT_REPLIES(postId, commentId),
        );
        return response;
      } catch (error) {
        throw error;
      }
    },

    deleteReply: async (postId, commentId, replyId) => {
      try {
        const response = await HttpClient.delete(
          `${API_ENDPOINTS.COMMENT_REPLIES(postId, commentId)}/${replyId}`,
        );
        return response;
      } catch (error) {
        throw error;
      }
    },
  };
}

export default new Client();
