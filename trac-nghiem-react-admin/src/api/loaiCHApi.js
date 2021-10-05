import axiosClient from "./axiosClient";

const loaiCHApi = {
  getAll: (params) => {
    const url = '/types';
    return axiosClient.get(url, { params });
  },

}

export default loaiCHApi;
