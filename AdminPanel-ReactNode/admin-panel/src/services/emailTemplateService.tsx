import axiosInstance from "../helpers/http";

export const editEmailTemplateAPI = async (formData: any, id: any) => {
  const res = await axiosInstance.put(`emailtemplates/${id}`, formData);
  return res;
};

export const addEmailTemplateAPI = async (formData: any) => {
  const res = await axiosInstance.post(`emailtemplates`, formData);
  return res;
};

export const getEmailTemplateAPI = async (query: any) => {
  const res = await axiosInstance.get(`emailtemplates/`, { params: query });
  return res;
};

export const deleteEmailTemplateAPI = async (id: any) => {
  const res = await axiosInstance.delete(`emailtemplates/${id}`);
  return res;
};

export const getEmailTemplatebyId = async (id: any) => {
  const res = await axiosInstance.get(`emailtemplates/${id}`);
  return res;
};
