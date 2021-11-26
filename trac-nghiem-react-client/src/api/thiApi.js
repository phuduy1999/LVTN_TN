import axiosClient from "./axiosClient";

const thiApi = {
  updateChoice: (data) => {
    const url = '/testing';
    return axiosClient.put(url, data);
  },

  updateTimer: (data) => {
    const url = '/testing/timer';
    return axiosClient.put(url, data);
  }
}

export default thiApi;
