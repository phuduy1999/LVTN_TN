import axiosClient from "./axiosClient";

const csdlApi = {
  getList: (params) => {
    const url = '/recovery/';
    return axiosClient.get(url, { params });
  },

  restore: (position) => {
    const url = `/recovery/restore/${position}`;
    return axiosClient.get(url);
  },

  backup: (data) => {
    const url = '/recovery/backup';
    return axiosClient.post(url, data);
  },


  // deleteOne: (id) => {
  //   const url = `/faculties/${id}`;
  //   return axiosClient.delete(url);
  // },

}

export default csdlApi;
