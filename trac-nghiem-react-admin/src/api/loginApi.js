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

  changePasswordTeacher: (data) => {
    const url = '/change-password-teacher';
    return axiosClient.post(url, data, {
      baseURL: "http://localhost:4000/api"
    });
  },

}

export default loginApi;
