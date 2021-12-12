import axiosClient from "./axiosClient";

const sinhVienApi = {
  getAll: (params) => {
    const url = '/students';
    return axiosClient.get(url, { params });
  },

  addOne: (data) => {
    const url = '/students';
    return axiosClient.post(url, data);
  },

  updateOne: (id, data) => {
    const url = `/students/${id}`;
    return axiosClient.put(url, data);
  },

  getOne: (id) => {
    const url = `/students/${id}`;
    return axiosClient.get(url);
  },

  deleteOne: (id) => {
    const url = `/students/${id}`;
    return axiosClient.delete(url);
  },

  checkFK: (id) => {
    const url = `/students/${id}/check`;
    return axiosClient.get(url);
  },

  getSV_LMH: (id) => {
    const url = `/students/${id}/class`;
    return axiosClient.get(url);
  },

}

export default sinhVienApi;
