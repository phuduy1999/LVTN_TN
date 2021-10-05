import axiosClient from "./axiosClient";

const giaoVienApi = {

  getOneByEmail: (email) => {
    const url = `/teachers/${email}/email`;
    return axiosClient.get(url);
  },
}

export default giaoVienApi;
