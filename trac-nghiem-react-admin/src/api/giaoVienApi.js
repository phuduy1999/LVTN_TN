import axiosClient from "./axiosClient";

const giaoVienApi = {
  getAll: (params) => {
    const url = '/teachers';
    return axiosClient.get(url, { params });
  },

  getOne: (id) => {
    const url = `/teachers/${id}`;
    return axiosClient.get(url);
  },

  getOneByEmail: (email) => {
    const url = `/teachers/${email}/email`;
    return axiosClient.get(url);
  },

  addOne: (data) => {
    const url = '/teachers';
    return axiosClient.post(url, data);
  },

  updateOne: (id, data) => {
    const url = `/teachers/${id}/edit`;
    return axiosClient.put(url, data);
  },

  deleteOne: (id) => {
    const url = `/teachers/${id}`;
    return axiosClient.delete(url);
  },
}

export default giaoVienApi;
