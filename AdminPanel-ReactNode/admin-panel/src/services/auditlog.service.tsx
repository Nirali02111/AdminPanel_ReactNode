import { AxiosResponse } from "axios";
import axiosInstance from "../helpers/http";
import { IResponseData, IListData } from "../interfaces/response.interface";

export interface IAuditLog {
  username: string;
  id: number;
  actionType: string;
  activity: string;
  timestamp: string;
  details: any;
  showDetails?: boolean
}

export const getAuditLogs = async (
  query: any
): Promise<AxiosResponse<IResponseData<IListData<IAuditLog>>>> => {
  return axiosInstance.get("/auditlogs/", { params: query });
};
