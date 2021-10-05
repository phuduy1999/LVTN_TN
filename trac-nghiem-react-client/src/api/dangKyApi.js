import axiosClient from "./axiosClient";

const dangKyApi = {

  getQuestions: (data) => {
    console.log(data);
    const url = '/registers/get-questions';
    return axiosClient.post(url, data);
  },

  getOne: (id) => {
    const url = `/registers/${id}`;
    return axiosClient.get(url);
  },

  checkRegister: (data) => {
    const url = '/registers/check-register';
    return axiosClient.post(url, data);
  },
}

export default dangKyApi;
