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
    getBoard: async data => HttpClient.get(API_ENDPOINTS.BOARD, data),
    deleteBoard: async postId =>
      HttpClient.delete(`${API_ENDPOINTS.BOARD}/${postId}`),
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
    //유저가 참여중인 채팅방 목록 가져오기
    getRooms: async data => HttpClient.get(API_ENDPOINTS.GET_ROOM, data),
    getUserProfile: async roomId => {
      try {
        const response = await HttpClient.get(
          API_ENDPOINTS.GET_USER_PROFILE(roomId),
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
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
        throw error;
      }
    },
    deleteComment: async (postId, commentId) => {
      try {
        const url = API_ENDPOINTS.DELETE_COMMENTS(postId, commentId);
        const response = await HttpClient.delete(url);
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

    //신고
    reportPost: async (postId, data) => {
      try {
        // Include the data in the request body
        const response = await HttpClient.post(
          API_ENDPOINTS.REPORT_POST(postId),
          data, // This sends the `reason` in the request body
        );
        return response;
      } catch (error) {
        throw error;
      }
    },

    reportComment: async (postId, commentId) => {
      try {
        const response = await HttpClient.post(
          API_ENDPOINTS.REPORT_COMMENT(postId, commentId),
        );
        return response;
      } catch (error) {
        throw error;
      }
    },

    reportReply: async (postId, commentId, replyId) => {
      try {
        const response = await HttpClient.post(
          API_ENDPOINTS.REPORT_REPLY(postId, commentId, replyId),
        );
        return response;
      } catch (error) {
        throw error;
      }
    },
  };
}

export default new Client();
