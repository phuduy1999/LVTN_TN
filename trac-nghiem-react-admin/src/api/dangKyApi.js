import axiosClient from "./axiosClient";

const dangKyApi = {
  getAll: (params) => {
    const url = '/registers';
    return axiosClient.get(url, { params });
  },

  addOne: (data) => {
    const url = '/registers';
    return axiosClient.post(url, data);
  },

  getOne: (id) => {
    const url = `/registers/${id}`;
    return axiosClient.get(url);
  },

  deleteOne: (id) => {
    const url = `/registers/${id}`;
    return axiosClient.delete(url);
  },

  updateOne: (id, data) => {
    const url = `/registers/${id}/edit`;
    return axiosClient.put(url, data);
  },

}

export default dangKyApi;
