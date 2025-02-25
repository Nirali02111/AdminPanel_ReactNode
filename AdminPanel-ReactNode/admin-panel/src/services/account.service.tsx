import axios, { AxiosResponse } from "axios";
import axiosInstance from "../helpers/http";
import { IResponseData } from "../interfaces/response.interface";

export interface IProfile {
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string;
}
export const getProfile = async (): Promise<
  AxiosResponse<IResponseData<IProfile>>
> => {
  return axiosInstance.get("/account/profile");
};
export const logout = async (): Promise<
  AxiosResponse<IResponseData<IProfile>>
> => {
  return axiosInstance.get("/account/logout");
};
export const updateProfile = (
  data: FormData
): Promise<AxiosResponse<IResponseData<null>>> => {
  return axiosInstance.put("/account/profile", data);
};

// export const loginAPI = async (formData: any) => {
//     const res = await axiosInstance.post(`/account/login`, formData);
//     return res;
// };

const baseURL = `${process.env.REACT_APP_API_SERVER_URL}/v1`;
export const loginAPI = async (formData: any) => {
  const res = await axios.post(`${baseURL}/account/login`, formData);
  return res;
};

export const forgotPasswordAPI = async (formData: any) => {
  const res = await axios.post(`${baseURL}/account/forgot-password`, formData);
  return res;
};

export const resetPasswordbyId = async (formData: any, id: any) => {
  const res = await axios.post(
    `${baseURL}/account/reset-password/${id}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${id}`,
      },
    }
  );
  return res;
};

export const changePasswordAPI = async (formData: any) => {
  const res = await axiosInstance.put(`/account/change-password`, formData);

  return res;
};
