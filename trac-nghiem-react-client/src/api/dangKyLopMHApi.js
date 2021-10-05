import axiosClient from "./axiosClient";

const dangKyLopMHApi = {
  registerClass: (data) => {
    const url = '/register-classes';
    return axiosClient.post(url, data);
  },

  getLMHdaDK: (id) => {
    const url = `/register-classes/${id}`;
    return axiosClient.get(url);
  },
}

export default dangKyLopMHApi;
