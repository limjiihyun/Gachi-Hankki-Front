import {HttpClient} from './http-client';
import {API_ENDPOINTS, getProfileEndpoint} from './api-endpoint';

class Client {
  users = {
    login: async userData => {
      const response = await HttpClient.post(API_ENDPOINTS.LOGIN, userData);
      if (response.status === 200) {
        console.log('굳굳', response.data.accessToken);
        await HttpClient.setAuthorization(response.data.accessToken);
        console.log('헤더 ㅎㅇ');
      }
      return response;
    },
    signUp: async userData => HttpClient.post(API_ENDPOINTS.SIGN_UP, userData),

    // signUp: async userData => {
    //   const response = await HttpClient.post(API_ENDPOINTS.SIGN_UP, userData);
    //   if (response.status === 201) {
    //     await HttpClient.setAuthorization(response.data);
    //   }
    //   return response;
    // },
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
    createChattingRoom: async data =>
      HttpClient.post(API_ENDPOINTS.CREATE_CHATTING_ROOM, data),
  };
}

export default new Client();
