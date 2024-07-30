import {HttpClient} from './http-client';
import {API_ENDPOINTS} from './api-endpoint';

class Client {
  users = {
    signUp: async userData => {
      const response = await Http
      Client.post(API_ENDPOINTS.SIGN_UP, userData);
      if (response.status === 201) {
        await HttpClient.setAuthorization(response.data);
      }
      return response;
    },
    createBoard: async data => HttpClient.post(API_ENDPOINTS.BOARD, data),
    me: async () => await HttpClient.get(API_ENDPOINTS.USERS_ME),
    refresh: async refresh =>
      HttpClient.post(API_ENDPOINTS.REFRESH_TOKEN, {
        refresh,
      }),
    getBoard: async data => HttpClient.get(API_ENDPOINTS.BOARD, data),
  };
}

export default new Client();
