export interface PaginationAndOrderParams {
    page: string;
    pageSize: string;
    orderBy: string;
    orderDirection: 'asc' | 'desc' | 'ASC' | 'DESC';
}