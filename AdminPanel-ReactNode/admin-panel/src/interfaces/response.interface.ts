export interface IResponseData<T> {
  status: boolean;
  data: T;
  message: string;
}
export interface IListData<T> {
  totalRecords: number;
  data: T[];
}
