import axios from 'axios';
import {API_ENDPOINTS} from './api-endpoint';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Axios = axios.create({
  //baseURL: 'https://gachi-hankki-back.onrender.com',
  baseURL: 'http://192.168.219.111:3000',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  withCredentials: true,
});

export const RefreshAxios = axios.create({
  baseURL: '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  xsrfCookieName: 'csrftoken',
  xsrfHeaderName: 'X-CSRFToken',
  withCredentials: true,
});

let isRefreshing = false;
let refreshSubscribers = [];
const subscribeTokenRefresh = callback => {
  refreshSubscribers.push(callback);
};
const onRefreshed = token => {
  while (refreshSubscribers.length) {
    const callback = refreshSubscribers.pop();
    callback(token);
  }
};
Axios.interceptors.request.use(async config => {
  if (
    config.headers.Authorization === '' ||
    config.headers.Authorization === undefined
  ) {
    const value = await AsyncStorage.getItem('AccessToken');
    console.log('뺏었당', value);
    if (value) {
      const accessToken = value;
      if (accessToken) {
        Axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
  }
  return config;
});

Axios.interceptors.response.use(
  response => response,
  async error => {
    const {
      config,
      response: {status, data, headers},
    } = error;

    if (status === 401 && config.url !== API_ENDPOINTS.REFRESH_TOKEN) {
      if (!isRefreshing) {
        isRefreshing = true;
        let returnAxios;
        try {
          const newToken = await refreshTokenRequest();
          isRefreshing = false;
          if (newToken != null) {
            config.headers.Authorization = `Bearer ${newToken.access}`;
            await setAuthToken(newToken);
            returnAxios = await Axios(config);
            onRefreshed(newToken);
          }
        } catch (refreshError) {
          isRefreshing = false;
          await setAuthToken(null);
          returnAxios = await Promise.reject(refreshError);
        } finally {
        }
        return returnAxios ?? (await Promise.reject(error));
      } else {
        return new Promise(resolve => {
          subscribeTokenRefresh(newToken => {
            config.headers.Authorization = `Bearer ${newToken.access}`;
            resolve(Axios(config));
          });
        });
      }
    }
    return await Promise.reject(error);
  },
);

async function refreshTokenRequest() {
  try {
    const refresh = await AsyncStorage.getItem('RefreshToken');
    if (refresh) {
      const response = await RefreshAxios.post(
        API_ENDPOINTS.REFRESH_TOKEN,
        {
          refresh,
        },
        {
          headers: {
            Authorization: undefined,
          },
        },
      ).catch(error => {});
      return response.data;
    } else {
      return await Promise.reject('Login required');
    }
  } catch (error) {
    delete Axios.defaults.headers.common.Authorization;
    throw error;
  }
}

export const setAuthToken = async token => {
  if (token) {
    await AsyncStorage.setItem('AccessToken', token);
    console.log('스토리지 토큰 적립');
    // await AsyncStorage.setItem('RefreshToken', token.refresh);
    Axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    await AsyncStorage.removeItem('AccessToken');
    // await AsyncStorage.removeItem('RefreshToken');
    delete Axios.defaults.headers.common.Authorization;
  }
};

export const notificationSetDay = async setDay => {
  await AsyncStorage.setItem('notificationSetDay', setDay);
};

export const getNotificationSetDay = async () => {
  const value = await AsyncStorage.getItem('notificationSetDay');
  return value;
};

export const defaultsHeadersCommon = async () => {
  const value = await AsyncStorage.getItem('AccessToken');
  Axios.defaults.headers.common.Authorization = `Bearer ${value}`;
};

export class HttpClient {
  static async get(url, params) {
    const response = await Axios.get(url, {params});
    return response;
  }

  static async post(url, data, options) {
    const response = await Axios.post(url, data, {
      ...options,
    });
    return response;
  }

  static async patch(url, data, options) {
    const response = await Axios.patch(url, data, {
      ...options,
    });
    return response;
  }

  static async put(url, data) {
    const response = await Axios.put(url, data);
    return response;
  }

  static async delete(url) {
    const response = await Axios.delete(url);
    return response;
  }

  static async setAuthorization(token) {
    await setAuthToken(token);
  }
}
