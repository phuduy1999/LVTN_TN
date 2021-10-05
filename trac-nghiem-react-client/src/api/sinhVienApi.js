import axiosClient from "./axiosClient";

const sinhVienApi = {
  getOneByEmail: (email) => {
    const url = `/students/${email}/email`;
    return axiosClient.get(url);
  },
}

export default sinhVienApi;
