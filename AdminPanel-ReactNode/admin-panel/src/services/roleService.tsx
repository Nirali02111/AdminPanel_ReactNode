import axiosInstance from "../helpers/http";

export const editRoleAPI = async (formData: any, id: any) => {
  const res = await axiosInstance.put(`roles/${id}`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const addRoleAPI = async (formData: any) => {
  const res = await axiosInstance.post(`roles`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const getRoleAPI = async (query: any) => {
  const res = await axiosInstance.get(`/roles/`, { params: query });
  return res;
};

export const deleteRoleAPI = async (id: any) => {
  const res = await axiosInstance.delete(`roles/${id}`);
  return res;
};

export const rolePermissionAPI = async () => {
  const res = await axiosInstance.get(`/role`, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};

export const userpermissionAPI = async () => {
  const res = await axiosInstance.get(`/permissions`);

  return res;
};

export const rolesAPI = async (id: any) => {
  const res = await axiosInstance.get(`/roles/${id}`, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res;
};
