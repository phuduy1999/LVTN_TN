import axiosClient from "./axiosClient";

const lopMHApi = {
  getAll: (params) => {
    const url = '/classes';
    return axiosClient.get(url, { params });
  },

  getAllCancel: (params) => {
    const url = '/classes/cancel';
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
    const url = `/classes/${id}`;
    return axiosClient.put(url, data);
  },

  deleteOne: (id) => {
    const url = `/classes/${id}`;
    return axiosClient.delete(url);
  },

  checkFK: (id) => {
    const url = `/classes/${id}/check`;
    return axiosClient.get(url);
  },

  checkBeforeEdit: (id) => {
    const url = `/classes/${id}/check-before-edit`;
    return axiosClient.get(url);
  },

  checkBeforeCancel: (id) => {
    const url = `/classes/${id}/check-before-cancel`;
    return axiosClient.get(url);
  },

  cancelOne: (id) => {
    const url = `/classes/${id}/cancel`;
    return axiosClient.put(url);
  },

  restoreOne: (id) => {
    const url = `/classes/${id}/restore`;
    return axiosClient.put(url);
  },

}

export default lopMHApi;
