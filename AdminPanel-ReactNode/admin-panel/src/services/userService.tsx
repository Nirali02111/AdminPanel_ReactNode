import axiosInstance from "../helpers/http";

export const editUserAPI = async (formData: any, id: any) => {
  const res = await axiosInstance.put(`users/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

export const addUserAPI = async (formData: any) => {
  const res = await axiosInstance.post(`users`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

export const getUserAPI = async (query: any) => {
  const res = await axiosInstance.get(`/users/`, { params: query });
  return res;
};

export const deleteUserAPI = async (id: any) => {
  const res = await axiosInstance.delete(`users/${id}`);
  return res;
};

export const getUserById = async (id: any) => {
  const res = await axiosInstance.get(`/users/${id}`);
  return res;
};

export const userRoles = async () => {
  const res = await axiosInstance.get(`/roles`);
  return res;
};
