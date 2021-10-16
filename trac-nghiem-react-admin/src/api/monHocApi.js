import axiosClient from "./axiosClient";

const monHocApi = {
  getAll: (params) => {
    const url = '/subjects';
    return axiosClient.get(url, { params });
  },

  getOne: (id) => {
    const url = `/subjects/${id}`;
    return axiosClient.get(url);
  },

  getOneByName: (name) => {
    const url = `/subjects/${name}/name`;
    return axiosClient.get(url);
  },

  addOne: (data) => {
    const url = '/subjects';
    return axiosClient.post(url, data);
  },

  updateOne: (id, data) => {
    const url = `/subjects/${id}/edit`;
    return axiosClient.put(url, data);
  },

  deleteOne: (id) => {
    const url = `/subjects/${id}`;
    return axiosClient.delete(url);
  },

  checkFK: (id) => {
    const url = `/subjects/${id}/check`;
    return axiosClient.get(url);
  },

}

export default monHocApi;
