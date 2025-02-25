import React, { useContext, useEffect, useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CFormInput,
  CHeader,
  CHeaderNav,
  CNavItem,
  CRow,
} from "@coreui/react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { AppBreadcrumb } from "../../components";
import ApplicationConfigDelete from "./ApplicationConfigDelete";
import PaginationSelect from "../../components/PaginationSelect";
import PaginationComponent from "../../components/paginationComponent";
import SortableColumnHeader from "../../components/SortableColumnHeader";
import ExportComponent from "../../components/ExportComponent";
import AppAlert from "../../components/AppAlert";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import CheckPermission from "../../components/CheckPermission";
import { getApplicationConfigurationAPI } from "../../services/applicationConfigurationService";
import { showPaginationInfo } from "../../components/showPaginationInfo";
import useAlert from "../../hooks/useAlert";
import { UserContext } from "../../context/UserContext";
import { IPagination } from "../../interfaces/common.interface";

interface IApplicationConfig {
  id: number;
  key: string;
  value: string;
  description: string;
  status: string;
}

const defaultPagination = {
  page: 1,
  pageSize: 10,
  totalRecords: 0,
};
const defaultSearchTerm = {
  key: "",
  value: "",
};

const ApplicationConfig = () => {
  const [loading, setLoading] = useState(true);
  const [applicationConfigs, setApplicationConfigs] = useState<
    IApplicationConfig[]
  >([]);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortColumn, setSortColumn] = useState("");
  // const [totalRecords, setTotalRecords] = useState(0);
  const [pagination, setPagination] = useState<IPagination>(defaultPagination);
  const { alertMessage, setAlertMessage } = useContext(UserContext);
  const { message, logMessage, type } = useAlert();
  const navigate = useNavigate();
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({
    key: "",
    value: "",
  });

  const handleInputChange = (
    field: keyof IApplicationConfig,
    value: string
  ) => {
    setSearchTerms({
      ...searchTerms,
      [field]: value,
    });
  };

  useEffect(() => {
    logMessage(alertMessage);
    setAlertMessage("");
  }, []);

  const fetchApplicationConfigs = async (search?: any) => {
    try {
      setLoading(true);
      const response = await getApplicationConfigurationAPI({
        ...pagination,
        orderBy: sortColumn,
        orderDirection: sortDirection,
        ...(search ? search : searchTerms),
      });

      const data = response.data.data;
      setApplicationConfigs(data.data);
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
  const handleEntriesChange = (value: number) => {
    setPagination((previousValue: IPagination) => ({
      ...previousValue,
      page: 1,
      pageSize: value,
    }));
  };

  const handleActionSearch = async () => {
    if (pagination.page === 1) {
      fetchApplicationConfigs();
    } else {
      setPagination((previousValue: IPagination) => ({
        ...previousValue,
        page: 1,
      }));
    }
  };

  const handleCancel = () => {
    setSearchTerms(defaultSearchTerm);
    fetchApplicationConfigs(defaultSearchTerm);
  };
  useEffect(() => {
    fetchApplicationConfigs();
  }, [pagination.page, pagination.pageSize, sortDirection, sortColumn]);

  const handlePageChange = (page: number) => {
    setPagination((previousValue: IPagination) => ({
      ...previousValue,
      page: page,
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
    <>
      <CHeader className="mb-4">
        <CContainer fluid>
          <div>
            <CRow>
              <CCol>
                <h3>Application Config</h3>
              </CCol>
            </CRow>
          </div>
          <CHeaderNav>
            <CNavItem>
              <CheckPermission permission="ApplicationConfiguration_Add">
                <Link to="/applicationconfiguration/add">
                  <CButton color="primary" className="px-4">
                    Add Config
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
              <ExportComponent fileName="ApplicationConfig - Admin Panel" />
            </div>
            <div className="table-responsive">
              <table className="table table-bordered table-striped" id="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>

                    <SortableColumnHeader
                      columnKey="key"
                      currentSortColumn={sortColumn}
                      currentSortDirection={sortDirection}
                      handleSort={handleSort}
                    >
                      Key
                    </SortableColumnHeader>
                    <SortableColumnHeader
                      columnKey="value"
                      currentSortColumn={sortColumn}
                      currentSortDirection={sortDirection}
                      handleSort={handleSort}
                    >
                      Value
                    </SortableColumnHeader>

                    <th scope="col">Action</th>
                  </tr>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">
                      <CFormInput
                        placeholder="Search key"
                        value={searchTerms.key}
                        onChange={(e) =>
                          handleInputChange("key", e.target.value)
                        }
                      />
                    </th>
                    <th scope="col">
                      <CFormInput
                        placeholder="Search Value"
                        value={searchTerms.value}
                        onChange={(e) =>
                          handleInputChange("value", e.target.value)
                        }
                      />
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
                    {applicationConfigs?.length > 0 ? (
                      applicationConfigs.map((template, index) => (
                        <tr key={index}>
                          <td>
                            {showPaginationInfo(pagination).startEntry + index}
                          </td>
                          <td>{template.key}</td>
                          <td>{template.value}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <CheckPermission permission="ApplicationConfiguration_Edit">
                                <Link
                                  to={`/applicationconfiguration/edit/${template.id}`}
                                >
                                  <CButton className="editButton">
                                    <FontAwesomeIcon icon={faEdit} />
                                  </CButton>
                                </Link>
                              </CheckPermission>
                              <CheckPermission permission="ApplicationConfiguration_Delete">
                                <ApplicationConfigDelete
                                  id={template.id}
                                  fetchApplicationConfigs={
                                    fetchApplicationConfigs
                                  }
                                />
                              </CheckPermission>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="no-records">
                        <td colSpan={4}>No records available</td>
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
    </>
  );
};

export default ApplicationConfig;
