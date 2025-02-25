import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
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
import { AppBreadcrumb } from "../../components";
import Roledelete from "./Roledelete";
import PaginationComponent from "../../components/paginationComponent";
import PaginationSelect from "../../components/PaginationSelect";
import SortableColumnHeader from "../../components/SortableColumnHeader";
import ExportComponent from "../../components/ExportComponent";
import AppAlert from "../../components/AppAlert";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import CheckPermission from "../../components/CheckPermission";
import { getRoleAPI } from "../../services/roleService";
import { showPaginationInfo } from "../../components/showPaginationInfo";
import useAlert from "../../hooks/useAlert";
import { UserContext } from "../../context/UserContext";
import { IPagination } from "../../interfaces/common.interface";
interface IRole {
  id: number;
  name: string;
  shortDescription: string;
  status: string;
}

const defaultPagination = {
  page: 1,
  pageSize: 10,
  totalRecords: 0,
};
const defaultSearchTerm = {
  name: "",
  shortDescription: "",
  status: "",
};
export const Role = () => {
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState<IRole[]>([]);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortColumn, setSortColumn] = useState("");
  const navigate = useNavigate();
  const [searchTerms, setSearchTerms] =
    useState<Record<string, string>>(defaultSearchTerm);
  const [pagination, setPagination] = useState<IPagination>(defaultPagination);
  const { alertMessage, setAlertMessage } = useContext(UserContext);
  const { message, logMessage } = useAlert();
  useEffect(() => {
    fetchRoles();
  }, [pagination.page, pagination.pageSize, sortDirection, sortColumn]);

  const fetchRoles = async (search?: any) => {
    try {
      setLoading(true);
      const response = await getRoleAPI({
        ...pagination,
        orderBy: sortColumn,
        orderDirection: sortDirection,
        ...(search ? search : searchTerms),
      });
      const data = response.data.data;
      setRoles(data.data);
      setPagination((previousValue: IPagination) => ({
        ...previousValue,
        totalRecords: data.totalRecords,
      }));
      setLoading(false);
    } catch (error: any) {
      setLoading(true);
      if (error.response.request.status == 403) {
        navigate("/forbidden");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    logMessage(alertMessage);
    setAlertMessage("");
  }, []);
  const handlePageChange = (page: number) => {
    setPagination((previousValue: IPagination) => ({
      ...previousValue,
      page: page,
    }));
  };

  const handleActionSearch = async () => {
    if (pagination.page === 1) {
      fetchRoles();
    } else {
      setPagination((previousValue: IPagination) => ({
        ...previousValue,
        page: 1,
      }));
    }
  };

  // Function to handle input changes for search terms
  const handleInputChange = (field: keyof IRole, value: string) => {
    setSearchTerms({
      ...searchTerms,
      [field]: value,
    });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    handleInputChange("status", value);
  };

  // Function to cancel/reset search terms
  const handleCancel = () => {
    setSearchTerms(defaultSearchTerm);
    fetchRoles(defaultSearchTerm);
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
                <h3>Roles</h3>
              </CCol>
            </CRow>
          </div>
          <CHeaderNav>
            <CNavItem>
              <CheckPermission permission="Role_Add">
                <Link to="/role/add">
                  <CButton color="primary" className="px-4">
                    Add Role
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
              <ExportComponent fileName="Role - Admin Panel" />
            </div>
            <div className="table-responsive">
              <table className="table table-bordered table-striped" id="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>

                    <SortableColumnHeader
                      columnKey="name"
                      currentSortColumn={sortColumn}
                      currentSortDirection={sortDirection}
                      handleSort={handleSort}
                    >
                      Name
                    </SortableColumnHeader>
                    <SortableColumnHeader
                      columnKey="shortDescription"
                      currentSortColumn={sortColumn}
                      currentSortDirection={sortDirection}
                      handleSort={handleSort}
                    >
                      Short Description
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
                        value={searchTerms.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                      />
                    </th>
                    <th scope="col">
                      <CFormInput
                        placeholder="Search Short Description"
                        value={searchTerms.shortDescription}
                        onChange={(e) =>
                          handleInputChange("shortDescription", e.target.value)
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
                    {roles?.length > 0 ? (
                      roles.map((role, index) => (
                        <tr key={index}>
                          <td>
                            {showPaginationInfo(pagination).startEntry + index}
                          </td>
                          <td>{role.name}</td>
                          <td>{role.shortDescription}</td>
                          <td>{role.status}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <CheckPermission permission="Role_Edit">
                                <Link to={`/role/edit/${role.id}`}>
                                  <CButton className="editButton">
                                    <FontAwesomeIcon icon={faEdit} />
                                  </CButton>
                                </Link>
                              </CheckPermission>
                              <CheckPermission permission="Role_Delete">
                                <Roledelete
                                  id={role.id}
                                  fetchRoles={fetchRoles}
                                />
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

export default Role;
