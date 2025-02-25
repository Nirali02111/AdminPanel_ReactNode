import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CFormInput,
  CFormSelect,
  CHeader,
  CHeaderNav,
  CNavItem,
  CRow,
} from "@coreui/react";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBreadcrumb } from "../../components";
import PaginationSelect from "../../components/PaginationSelect";
import ExportComponent from "../../components/ExportComponent";
import SortableColumnHeader from "../../components/SortableColumnHeader";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import PaginationComponent from "../../components/paginationComponent";
import FAQdelete from "./FAQdelete";
import AppAlert from "../../components/AppAlert";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import CheckPermission from "../../components/CheckPermission";
import { getFaqAPI } from "../../services/faqService";
import { showPaginationInfo } from "../../components/showPaginationInfo";
import { UserContext } from "../../context/UserContext";
import useAlert from "../../hooks/useAlert";
import { IPagination } from "../../interfaces/common.interface";

interface IFAQ {
  id: string;
  question: string;
  displayOrder: string;
  status: string;
}
const defaultPagination = {
  page: 1,
  pageSize: 10,
  totalRecords: 0,
};
const defaultSearchTerm = {
  question: "",
  displayOrder: "",
  status: "",
};

const FAQ = () => {
  const [loading, setLoading] = useState(true);
  const [Faq, setFaq] = useState<IFAQ[]>([]);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortColumn, setSortColumn] = useState("");
  const navigate = useNavigate();
  const [searchTerms, setSearchTerms] =
    useState<Record<string, string>>(defaultSearchTerm);
  const [pagination, setPagination] = useState<IPagination>(defaultPagination);
  const { alertMessage, setAlertMessage } = useContext(UserContext);
  const { message, logMessage } = useAlert();
  useEffect(() => {
    fetchFaq();
  }, [pagination.page, pagination.pageSize, sortDirection, sortColumn]);

  useEffect(() => {
    logMessage(alertMessage);
    setAlertMessage("");
  }, []);
  const fetchFaq = async (search?: any) => {
    try {
      setLoading(true);
      const response = await getFaqAPI({
        ...pagination,
        sortColumn,
        sortDirection,
        ...(search ? search : searchTerms),
      });
      const data = response.data.data;
      setFaq(data.data);
      setPagination((previousValue: IPagination) => ({
        ...previousValue,
        totalRecords: data.totalRecords,
      }));
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      if (error.response.request.status == 403) {
        navigate("/forbidden");
      }
    }
  };

  const handlePageChange = (page: number) => {
    setPagination((previousValue: IPagination) => ({
      ...previousValue,
      page: page,
    }));
  };

  const handleActionSearch = async () => {
    if (pagination.page === 1) {
      fetchFaq();
    } else {
      setPagination((previousValue: IPagination) => ({
        ...previousValue,
        page: 1,
      }));
    }
  };
  const handleInputChange = (field: keyof IFAQ, value: string) => {
    setSearchTerms({
      ...searchTerms,
      [field]: value,
    });
  };
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    handleInputChange("status", value);
  };
  const handleCancel = () => {
    setSearchTerms(defaultSearchTerm);
    fetchFaq(defaultSearchTerm);
  };
  const handleEntriesChange = (value: number) => {
    setPagination((previousValue: IPagination) => ({
      ...previousValue,
      page: 1,
      pageSize: value,
    }));
  };

  const handleSort = (column: any) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <div>
      <CHeader className="mb-4">
        <CContainer fluid>
          <div>
            <CRow>
              <CCol>
                <h3>FAQ</h3>
              </CCol>
            </CRow>
          </div>
          <CHeaderNav>
            <CNavItem>
              <CheckPermission permission="FAQ_Add">
                <Link to="/faq/add">
                  <CButton color="primary" className="px-4">
                    Add FAQ
                  </CButton>
                </Link>
              </CheckPermission>
            </CNavItem>
          </CHeaderNav>
        </CContainer>
        <CContainer fluid>
          <AppBreadcrumb />
        </CContainer>
      </CHeader>
      <div className="body flex-grow-1 px-3">
        <CCard className="mb-4">
          <CCardBody>
            <AppAlert message={message} type="success" />
            <div className="d-flex justify-content-between flex-wrap">
              <PaginationSelect
                onChange={handleEntriesChange}
                value={pagination.pageSize}
              />
              <ExportComponent fileName="FAQ - Admin Panel" />
            </div>
            <div className="table-responsive">
              <table className="table table-bordered table-striped" id="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>

                    <SortableColumnHeader
                      columnKey="question"
                      currentSortColumn={sortColumn}
                      currentSortDirection={sortDirection}
                      handleSort={handleSort}
                    >
                      Question
                    </SortableColumnHeader>
                    <SortableColumnHeader
                      columnKey="displayOrder"
                      currentSortColumn={sortColumn}
                      currentSortDirection={sortDirection}
                      handleSort={handleSort}
                    >
                      Display Order
                    </SortableColumnHeader>

                    <SortableColumnHeader
                      columnKey="status"
                      currentSortColumn={sortColumn}
                      currentSortDirection={sortDirection}
                      handleSort={handleSort}
                    >
                      Status
                    </SortableColumnHeader>
                    <th scope="col">Action</th>
                  </tr>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">
                      <CFormInput
                        placeholder="Search Name"
                        value={searchTerms.question}
                        onChange={(e) =>
                          handleInputChange("question", e.target.value)
                        }
                      />
                    </th>
                    <th scope="col">
                      <CFormInput
                        placeholder="Search Short Description"
                        value={searchTerms.shortDescription}
                        onChange={(e) =>
                          handleInputChange("displayOrder", e.target.value)
                        }
                      />
                    </th>
                    <th scope="col">
                      <CFormSelect
                        value={searchTerms.status}
                        onChange={handleStatusChange}
                      >
                        <option value="">All</option>
                        <option value="Active">Active</option>
                        <option value="InActive">InActive</option>
                      </CFormSelect>
                    </th>
                    <th scope="col">
                      <CButton
                        className="me-2"
                        color="light"
                        onClick={handleActionSearch}
                      >
                        <FontAwesomeIcon icon={faSearch} />
                      </CButton>
                      <CButton color="light" onClick={handleCancel}>
                        <FontAwesomeIcon icon={faTimes} />
                      </CButton>
                    </th>
                  </tr>
                </thead>
                {loading ? (
                  <SpinnerLoader />
                ) : (
                  <tbody>
                    {Faq?.length > 0 ? (
                      Faq.map((faq, index) => (
                        <tr key={index}>
                          <td>
                            {showPaginationInfo(pagination).startEntry + index}
                          </td>
                          <td>{faq.question}</td>
                          <td>{faq.displayOrder}</td>
                          <td>{faq.status}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <CheckPermission permission="FAQ_Edit">
                                <Link to={`/faq/edit/${faq.id}`}>
                                  <CButton className="editButton">
                                    <FontAwesomeIcon icon={faEdit} />
                                  </CButton>
                                </Link>
                              </CheckPermission>
                              <CheckPermission permission="FAQ_Delete">
                                <FAQdelete id={faq.id} fetchFaq={fetchFaq} />
                              </CheckPermission>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="no-records">
                        <td colSpan={5}>No records available</td>
                      </tr>
                    )}
                  </tbody>
                )}
              </table>
            </div>
            <div className="d-flex flex-wrap justify-content-between">
              <div>{showPaginationInfo(pagination).displayRange}</div>
              <PaginationComponent
                onPageChange={handlePageChange}
                currentPage={pagination.page}
                totalRecords={pagination?.totalRecords as number}
                pageSize={pagination.pageSize}
              />
            </div>
          </CCardBody>
        </CCard>
      </div>
    </div>
  );
};

export default FAQ;
