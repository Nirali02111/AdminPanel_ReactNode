import axiosInstance from "../helpers/http";

export const editFaqAPI = async (formData: any, id: any) => {
  const res = await axiosInstance.put(`faqs/${id}`, formData);
  return res;
};

export const addFaqAPI = async (formData: any) => {
  const res = await axiosInstance.post(`faqs`, formData);
  return res;
};

export const getFaqAPI = async (query: any) => {
  const res = await axiosInstance.get(`faqs/`, { params: query });
  return res;
};
export const deleteFaqAPI = async (id: any) => {
  const res = await axiosInstance.delete(`faqs/${id}`);
  return res;
};

export const getFaqbyId = async (id: any) => {
  const res = await axiosInstance.get(`faqs/${id}`);
  return res;
};
