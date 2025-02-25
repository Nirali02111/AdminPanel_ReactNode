import axiosInstance from "../helpers/http";

export const dashboardAPI = async () => {
    const res = await axiosInstance.get(`/dashboard`);
    return res;
}