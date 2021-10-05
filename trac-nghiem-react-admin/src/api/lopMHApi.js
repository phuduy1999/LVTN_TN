import axiosClient from "./axiosClient";

const lopMHApi = {
  getAll: (params) => {
    const url = '/classes';
    return axiosClient.get(url, { params });
  },

  addOne: (data) => {
    const url = '/classes';
    return axiosClient.post(url, data);
  },

  getOne: (id) => {
    const url = `/classes/${id}`;
    return axiosClient.get(url);
  },

  updateOne: (id, data) => {
    const url = `/classes/${id}/edit`;
    return axiosClient.put(url, data);
  },

  deleteOne: (id) => {
    const url = `/classes/${id}`;
    return axiosClient.delete(url);
  },

}

export default lopMHApi;
