import axiosClient from "./axiosClient";

const boDeApi = {
  getAll: (params) => {
    const url = '/questions';
    return axiosClient.get(url, { params });
  },

  addOne: (data) => {
    const url = '/questions';
    return axiosClient.post(url, data);
  },

  addByExcel: (data) => {
    const url = '/questions/excel';
    return axiosClient.post(url, data);
  },

  updateOne: (id, data) => {
    const url = `/questions/${id}`;
    return axiosClient.put(url, data);
  },

  getOne: (id) => {
    const url = `/questions/${id}`;
    return axiosClient.get(url);
  },

  getLuaChon: (id) => {
    const url = `/questions/${id}/choices`;
    return axiosClient.get(url);
  },

  deleteOne: (id) => {
    const url = `/questions/${id}`;
    return axiosClient.delete(url);
  },

  checkFK: (id) => {
    const url = `/questions/${id}/check`;
    return axiosClient.get(url);
  },

}

export default boDeApi;
