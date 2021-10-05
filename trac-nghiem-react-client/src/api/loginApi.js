import axiosClient from "./axiosClient";

const loginApi = {

  login: (data) => {
    const url = '/login';
    return axiosClient.post(url, data, {
      baseURL: "http://localhost:4000/api"
    });
  },

  logout: (data) => {
    const url = '/logout';
    return axiosClient.post(url, data, {
      baseURL: "http://localhost:4000/api"
    });
  },

  refreshToken: (data) => {
    const url = '/refreshToken';
    return axiosClient.post(url, data, {
      baseURL: "http://localhost:4000/api"
    });
  },

  changePasswordStudent: (data) => {
    const url = '/change-password-student';
    return axiosClient.post(url, data, {
      baseURL: "http://localhost:4000/api"
    });
  },

}

export default loginApi;
