import axios from 'axios';
import queryString from 'query-string';
import dotenv from 'dotenv'
import loginApi from 'src/api/loginApi';
import { createBrowserHistory } from 'history';
let history = createBrowserHistory();
import InfoUserLogin from 'src/_infoUser';

dotenv.config();

const getToken = () => {
  const user = InfoUserLogin();
  if (user && user.accessToken) {
    return user.accessToken;
  } else {
    return null;
  }
}

const getRefreshToken = () => {
  const user = InfoUserLogin();
  if (user && user.refreshToken) {
    return user.refreshToken;
  } else {
    return null;
  }
}

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: params => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {

  const token = await getToken();

  if (token) {
    config.headers['x-access-token'] = token;
  }

  return config;
})

axiosClient.interceptors.response.use((response) => {
  if (response && response.data) {
    return response.data;
  }
  return response;
}, async (error) => {
  // Handle errors
  const originalConfig = error.config;

  if (originalConfig.url !== "/api/login" && error.response) {
    // Access Token was expired
    if (error.response.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;

      try {
        const rs = await loginApi.refreshToken({
          refreshToken: getRefreshToken(),
        })

        let user = InfoUserLogin();
        user.accessToken = rs.accessToken;
        localStorage.setItem("user", JSON.stringify(user));

        window.location.reload();

        return instance(originalConfig);
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
    else if (error.response.status === 403) {
      if (error.response.data.message.includes('Refresh')) {
        alert(error.response.data.message);
        localStorage.removeItem('user');

        history.push('/login');
        window.location.reload();
      }
    }
  }

  return Promise.reject(error);
});

export default axiosClient;
