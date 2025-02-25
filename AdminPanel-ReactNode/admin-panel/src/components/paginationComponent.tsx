import React from "react";
import { CPagination, CPaginationItem } from "@coreui/react";
import { PaginationControl } from "react-bootstrap-pagination-control";

interface PaginationProps {
  currentPage: number;
  //   totalPages: number;
  onPageChange: (page: number) => void;
  between?: number;
  totalRecords: number;
  pageSize: number;
  ellipsis?: number;
}

const PaginationComponent: React.FC<PaginationProps> = ({
  currentPage = 1,
  //   totalPages,
  onPageChange,
  between = 3,
  totalRecords,
  pageSize = 10,
  ellipsis = 2,
}) => {
  const totalPages = Math.floor(totalRecords / pageSize);

  return (
    <>
      <PaginationControl
        page={currentPage}
        between={between}
        total={totalRecords as number}
        limit={pageSize}
        changePage={onPageChange}
        ellipsis={ellipsis}
      />
      {/* <CPagination aria-label="Page navigation example">
        <CPaginationItem
          aria-label="Previous"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <span aria-hidden="true">&laquo;</span>
        </CPaginationItem>

        {Array.from({ length: totalPages }, (_, index) => (
          <CPaginationItem
            key={index}
            active={currentPage === index + 1}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </CPaginationItem>
        ))}

        <CPaginationItem
          aria-label="Next"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <span aria-hidden="true">&raquo;</span>
        </CPaginationItem>
      </CPagination> */}
    </>
  );
};

export default PaginationComponent;
