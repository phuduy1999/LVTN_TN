import axiosClient from "./axiosClient";

const khoaApi = {
  getAll: (params) => {
    const url = '/roles';
    return axiosClient.get(url, { params });
  },
}

export default khoaApi;
