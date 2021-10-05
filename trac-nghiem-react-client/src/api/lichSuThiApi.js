import axiosClient from "./axiosClient";

const lichSuThiApi = {

  getLichSuThi: (data) => {
    const url = '/history-test';
    return axiosClient.post(url, data);
  },

  getQuestionsHistory: (data) => {
    const url = '/history-test/get-questions-history';
    return axiosClient.post(url, data);
  },

}

export default lichSuThiApi;
