import axiosClient from "./axiosClient";

const monHocApi = {
  getAll: (params) => {
    const url = '/subjects';
    return axiosClient.get(url, { params });
  },
}

export default monHocApi;
