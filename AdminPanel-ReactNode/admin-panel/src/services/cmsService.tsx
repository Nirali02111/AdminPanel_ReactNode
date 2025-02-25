import axiosInstance from "../helpers/http";

export const editCMSAPI = async (formData: any, id: any) => {
  const res = await axiosInstance.put(`cmsmanagements/${id}`, formData);
  return res;
};

export const addCMSAPI = async (formData: any) => {
  const res = await axiosInstance.post(`cmsmanagements`, formData);
  return res;
};

export const getCMSAPI = async (query: any) => {
  const res = await axiosInstance.get(`cmsmanagements/`, { params: query });
  return res;
};

export const deleteCMSAPI = async (id: any) => {
  const res = await axiosInstance.delete(`cmsmanagements/${id}`);
  return res;
};

export const getCMSbyId = async (id: any) => {
  const res = await axiosInstance.get(`cmsmanagements/${id}`);
  return res;
};
