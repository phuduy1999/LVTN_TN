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

  checkFK: (id) => {
    const url = `/registers/${id}/check`;
    return axiosClient.get(url);
  },

  updateOne: (id, data) => {
    const url = `/registers/${id}/edit`;
    return axiosClient.put(url, data);
  },

  checkBeforeEdit: (id) => {
    const url = `/registers/${id}/check-before-edit`;
    return axiosClient.get(url);
  },

}

export default dangKyApi;
