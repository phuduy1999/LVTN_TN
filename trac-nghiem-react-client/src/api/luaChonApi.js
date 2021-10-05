import axiosClient from "./axiosClient";

const luaChonApi = {

  getOptionsOfQuestion: (params) => {
    const url = `/options/${params}`;
    return axiosClient.get(url);
  },
}

export default luaChonApi;
