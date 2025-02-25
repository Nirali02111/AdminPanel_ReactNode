import axiosInstance from "../helpers/http";

export const editApplicationConfigurationAPI = async (
  formData: any,
  id: any
) => {
  const res = await axiosInstance.put(
    `applicationconfigurations/${id}`,
    formData
  );
  return res;
};

export const addApplicationConfigurationAPI = async (formData: any) => {
  const res = await axiosInstance.post(`applicationconfigurations`, formData);

  return res;
};

export const getApplicationConfigurationAPI = async (query: any) => {
  const res = await axiosInstance.get(`/applicationconfigurations/`, {
    params: query,
  });
  return res;
};

export const deleteApplicationConfigurationAPI = async (id: any) => {
  const res = await axiosInstance.delete(`applicationconfigurations/${id}`);
  return res;
};

export const getApplicationConfigurationbyId = async (id: any) => {
  const res = await axiosInstance.get(`applicationconfigurations/${id}`);
  return res;
};
