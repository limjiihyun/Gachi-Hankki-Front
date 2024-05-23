import {HttpClient} from './http-client';
import {API_ENDPOINTS} from './api-endpoint';
import axios from 'axios';

class Client {
  users = {
    signIn: async kakaoId => {
      const response = await HttpClient.post(API_ENDPOINTS.SIGN_IN, {
        kakao_id: kakaoId,
      });
      if (response.status === 200) {
        await HttpClient.setAuthorization(response.data);
      }
      return response;
    },
    signUp: async userData => {
      const response = await HttpClient.post(API_ENDPOINTS.SIGN_UP, userData);
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
    productCodeVerification: async code =>
      HttpClient.get(API_ENDPOINTS.PRODUCT_CODE_VERIFICATION(code)),
    createSelfDiagnosis: async data =>
      HttpClient.post(API_ENDPOINTS.SELF_DIAGNOSIS, data),
    createSmokingGoalSettings: async data =>
      HttpClient.post(API_ENDPOINTS.NO_SMOKING_GOAL_SETTINGS, data),
    createSmokingDiary: async data =>
      HttpClient.post(API_ENDPOINTS.SMOKING_DIARY, data),
    getSmokingDiary: async data =>
      HttpClient.get(API_ENDPOINTS.SMOKING_DIARY, data),
    getSmokingDashboardSummary: async () =>
      await HttpClient.get(API_ENDPOINTS.NO_SMOKING_DASHBOARD_SUMMARY),
  };
  services = {
    questions: async () =>
      axios.get(
        'https://kr.object.ncloudstorage.com/omnicare/omnicare_question.json',
        {
          headers: {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
            Expires: '0',
          },
        },
      ),
  };
}

export default new Client();
