import axiosClient from "./axiosClient";

const reportApi = {
  getDSKyTen: (id) => {
    const url = `/reports/list-signature/${id}`;
    return axiosClient.get(url);
  },

  getBangDiem: (id) => {
    const url = `/reports/transcript/${id}`;
    return axiosClient.get(url);
  },

  getDSLopMonHoc: (status) => {
    const url = `/reports/list-class-opened/${status}`;
    return axiosClient.get(url);
  },

  getCTBT: (data) => {
    const url = `/reports/questions-history`;
    return axiosClient.post(url, data);
  },
}

export default reportApi;
