import axiosClient from "./axiosClient";

const monHocApi = {
  getAll: (params) => {
    const url = '/subjects';
    return axiosClient.get(url, { params });
  },

  getOne: (id) => {
    const url = `/subjects/${id}`;
    return axiosClient.get(url);
  }
}

export default monHocApi;
