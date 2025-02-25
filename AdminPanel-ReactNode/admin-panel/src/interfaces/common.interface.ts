export interface IPagination {
  page: number;
  pageSize: number;
  totalRecords: number;
}

export interface ISortOption {
  orderDirection: "ASC" | "DESC";
  orderBy: string;
}
