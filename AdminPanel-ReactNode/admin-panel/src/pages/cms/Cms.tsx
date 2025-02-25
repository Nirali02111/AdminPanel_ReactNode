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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { AppBreadcrumb } from "../../components";
import Cmsdelete from "./Cmsdelete";
import PaginationComponent from "../../components/paginationComponent";
import PaginationSelect from "../../components/PaginationSelect";
import SortableColumnHeader from "../../components/SortableColumnHeader";
import ExportComponent from "../../components/ExportComponent";
import AppAlert from "../../components/AppAlert";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import CheckPermission from "../../components/CheckPermission";
import { getCMSAPI } from "../../services/cmsService";
import { showPaginationInfo } from "../../components/showPaginationInfo";
import { UserContext } from "../../context/UserContext";
import useAlert from "../../hooks/useAlert";
import { IPagination } from "../../interfaces/common.interface";

interface CMSPage {
  id: string;
  title: string;
  key: string;
  metaKeyword: string;
  status: string;
}

const defaultPagination = {
  page: 1,
  pageSize: 10,
  totalRecords: 0,
};
const defaultSearchTerm = {
  id: "",
  title: "",
  key: "",
  metaKeyword: "",
  status: "",
};
const Cms = () => {
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState<CMSPage[]>([]);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortColumn, setSortColumn] = useState("");
  const navigate = useNavigate();
  const { alertMessage, setAlertMessage } = useContext(UserContext);
  const { message, logMessage } = useAlert();
  const [searchTerms, setSearchTerms] = useState<CMSPage>(defaultSearchTerm);
  const [pagination, setPagination] = useState<IPagination>(defaultPagination);

  const handleActionSearch = async () => {
    if (pagination.page === 1) {
      fetchCMSPages();
    } else {
      setPagination((previousValue: IPagination) => ({
        ...previousValue,
        page: 1,
      }));
    }
  };

  useEffect(() => {
    logMessage(alertMessage);
    setAlertMessage("");
  }, []);
  const handleCancel = () => {
    setSearchTerms(defaultSearchTerm);
    fetchCMSPages(defaultSearchTerm);
  };

  const fetchCMSPages = async (search?: any) => {
    try {
      setLoading(true);
      const response = await getCMSAPI({
        ...pagination,
        sortColumn,
        sortDirection,
        ...(search ? search : searchTerms),
      });
      const data = response.data.data;
      setPages(data.data);
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

  const handleSort = (column: any) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleInputChange = (field: keyof CMSPage, value: string) => {
    setSearchTerms({
      ...searchTerms,
      [field]: value,
    });
  };
  const handlePageChange = (page: number) => {
    // setCurrentPage(page);
    setPagination((previousValue: IPagination) => ({
      ...previousValue,
      page: page,
    }));
  };
  useEffect(() => {
    fetchCMSPages();
  }, [pagination.page, pagination.pageSize, sortDirection, sortColumn]);

  const handleEntriesChange = (value: number) => {
    setPagination((previousValue: IPagination) => ({
      ...previousValue,
      page: 1,
      pageSize: value,
    }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    handleInputChange("status", value);
  };

  return (
    <>
      <CHeader className="mb-4">
        <CContainer fluid>
          <div>
            <CRow>
              <CCol>
                <h3>CMS</h3>
              </CCol>
            </CRow>
          </div>
          <CHeaderNav>
            <CNavItem>
              <CheckPermission permission="CMSManagement_Add">
                <Link to="/cmsmanagement/add">
                  <CButton color="primary" className="px-4">
                    Add CMS
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

      <CCard className="mb-4">
        <CCardBody>
          <AppAlert message={message} type="success" />
          <div className="d-flex justify-content-between flex-wrap">
            <PaginationSelect
              onChange={handleEntriesChange}
              value={pagination.pageSize}
            />
            <ExportComponent fileName="CMS - Admin Panel" />
          </div>
          <div className="table-responsive">
            <table className="table table-bordered table-striped" id="table">
              <thead>
                <tr>
                  <th scope="col">#</th>

                  <SortableColumnHeader
                    columnKey="title"
                    currentSortColumn={sortColumn}
                    currentSortDirection={sortDirection}
                    handleSort={handleSort}
                  >
                    Title
                  </SortableColumnHeader>
                  <SortableColumnHeader
                    columnKey="key"
                    currentSortColumn={sortColumn}
                    currentSortDirection={sortDirection}
                    handleSort={handleSort}
                  >
                    Key
                  </SortableColumnHeader>
                  <SortableColumnHeader
                    columnKey="metaKeyword"
                    currentSortColumn={sortColumn}
                    currentSortDirection={sortDirection}
                    handleSort={handleSort}
                  >
                    MetaKeyword
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
                      placeholder="Search Title"
                      value={searchTerms.title}
                      onChange={(e: any) =>
                        handleInputChange("title", e.target.value)
                      }
                    />
                  </th>
                  <th scope="col">
                    <CFormInput
                      placeholder="Search Key"
                      value={searchTerms.key}
                      onChange={(e: any) =>
                        handleInputChange("key", e.target.value)
                      }
                    />
                  </th>
                  <th scope="col">
                    <CFormInput
                      placeholder="Search Subject"
                      value={searchTerms.metaKeyword}
                      onChange={(e: any) =>
                        handleInputChange("metaKeyword", e.target.value)
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
                      <option value="inactive">Inactive</option>
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
                  {pages.length > 0 ? (
                    pages?.map((template, index) => (
                      <tr key={index}>
                        <td>
                          {showPaginationInfo(pagination).startEntry + index}
                        </td>
                        <td>{template.title}</td>
                        <td>{template.key}</td>
                        <td>{template.metaKeyword}</td>
                        <td>{template.status}</td>
                        <td>
                          <div className="d-flex gap-2">
                            <CheckPermission permission="CMSManagement_Edit">
                              {" "}
                              <Link to={`/cmsmanagement/edit/${template.id}`}>
                                <CButton className="editButton">
                                  <FontAwesomeIcon icon={faEdit} />
                                </CButton>
                              </Link>
                            </CheckPermission>
                            <CheckPermission permission="CMSManagement_Delete">
                              {" "}
                              <Cmsdelete
                                id={template.id}
                                fetchItems={fetchCMSPages}
                              />
                            </CheckPermission>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr className="no-records">
                      <td colSpan={6}>No records available</td>
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
    </>
  );
};

export default Cms;
