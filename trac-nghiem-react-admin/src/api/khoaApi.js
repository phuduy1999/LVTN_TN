import axiosClient from "./axiosClient";

const khoaApi = {
  getAll: (params) => {
    const url = '/faculties';
    return axiosClient.get(url, { params });
  },

  getOne: (id) => {
    const url = `/faculties/${id}`;
    return axiosClient.get(url);
  },

  addOne: (data) => {
    const url = '/faculties';
    return axiosClient.post(url, data);
  },

  updateOne: (id, data) => {
    const url = `/faculties/${id}`;
    return axiosClient.put(url, data);
  },

  deleteOne: (id) => {
    const url = `/faculties/${id}`;
    return axiosClient.delete(url);
  },

  checkFK: (id) => {
    const url = `/faculties/${id}/check`;
    return axiosClient.get(url);
  },

}

export default khoaApi;
