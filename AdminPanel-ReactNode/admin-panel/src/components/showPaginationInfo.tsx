import { IPagination } from "../interfaces/common.interface";

export const showPaginationInfo = ({
  totalRecords,
  page,
  pageSize,
}: IPagination) => {
  const startEntry = totalRecords === 0 ? 0 : (page - 1) * pageSize + 1;

  const endEntry =
    totalRecords === 0 ? 0 : Math.min(page * pageSize, totalRecords);

  const totalEntries = totalRecords;

  const displayRange =
    totalEntries === 0
      ? `Showing 0 to 0 of 0 entries`
      : `Showing ${startEntry} to ${endEntry} of ${totalEntries} entries`;
  return { startEntry, displayRange };
};
