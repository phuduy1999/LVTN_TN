import axiosClient from "./axiosClient";

const ghiBaiThiApi = {

  recordMark: (data) => {
    console.log(data);
    const url = '/record-mark';
    return axiosClient.post(url, data);
  },

  recordDetail: (data) => {
    console.log(data);
    const url = '/record-mark/detail-test';
    return axiosClient.post(url, data);
  },

}

export default ghiBaiThiApi;
