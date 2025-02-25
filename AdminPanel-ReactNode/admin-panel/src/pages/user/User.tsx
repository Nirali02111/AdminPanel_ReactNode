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
import Userdelete from "./Userdelete";
import { AppBreadcrumb } from "../../components";
import PaginationComponent from "../../components/paginationComponent";
import PaginationSelect from "../../components/PaginationSelect";
import SortableColumnHeader from "../../components/SortableColumnHeader";
import ExportComponent from "../../components/ExportComponent";
import AppAlert from "../../components/AppAlert";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import CheckPermission from "../../components/CheckPermission";
import { getUserAPI } from "../../services/userService";
import { showPaginationInfo } from "../../components/showPaginationInfo";
import { UserContext } from "../../context/UserContext";
import useAlert from "../../hooks/useAlert";
import { IPagination } from "../../interfaces/common.interface";

interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  status: string;
}

const defaultPagination = {
  page: 1,
  pageSize: 10,
  totalRecords: 0,
};
const defaultSearchTerm = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  status: "",
};
export const User = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<IUser[]>([]);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortColumn, setSortColumn] = useState("");
  const [searchTerms, setSearchTerms] = useState<IUser>(defaultSearchTerm);
  const [pagination, setPagination] = useState<IPagination>(defaultPagination);
  const { alertMessage, setAlertMessage } = useContext(UserContext);
  const { message, logMessage } = useAlert();
  const navigate = useNavigate();
  const fetchUsers = async (search?: any) => {
    try {
      setLoading(true);
      const response = await getUserAPI({
        page: pagination.page,
        pageSize: pagination.pageSize,
        orderBy: sortColumn,
        orderDirection: sortDirection,
        ...(search ? search : searchTerms),
      });

      const data = response.data.data;
      setUsers(data.data);
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
  useEffect(() => {
    logMessage(alertMessage);
    setAlertMessage("");
  }, []);
  useEffect(() => {
    fetchUsers();
  }, [pagination.page, pagination.pageSize, sortDirection, sortColumn]);

  const handlePageChange = (page: number) => {
    setPagination((previousValue: IPagination) => ({
      ...previousValue,
      page: page,
    }));
  };

  const handleActionSearch = async () => {
    if (pagination.page === 1) {
      fetchUsers();
    } else {
      setPagination((previousValue: IPagination) => ({
        ...previousValue,
        page: 1,
      }));
    }
  };

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
  const handleCancel = () => {
    setSearchTerms(defaultSearchTerm);
    fetchUsers(defaultSearchTerm);
  };

  const handleInputChange = (field: keyof IUser, value: string) => {
    setSearchTerms({
      ...searchTerms,
      [field]: value,
    });
  };
  const handleSort = (column: any) => {
    setPagination((previousValue: IPagination) => ({
      ...previousValue,
      page: 1,
    }));
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  return (
    <div>
      <div>
        <CHeader className="mb-4">
          <CContainer fluid>
            <div>
              <CRow>
                <CCol>
                  <h3>Users</h3>
                </CCol>
              </CRow>
            </div>
            <CHeaderNav>
              <CNavItem>
                <CheckPermission permission="User_Add">
                  <Link to="/user/add">
                    <CButton color="primary" className="px-4">
                      Add User
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
                <ExportComponent fileName="User - Admin Panel" />
              </div>
              <div className="table-responsive">
                <table
                  className="table table-bordered table-striped"
                  id="table"
                >
                  <thead>
                    <tr>
                      <th scope="col">#</th>

                      <SortableColumnHeader
                        columnKey="firstName"
                        currentSortColumn={sortColumn}
                        currentSortDirection={sortDirection}
                        handleSort={handleSort}
                      >
                        FirstName
                      </SortableColumnHeader>

                      <SortableColumnHeader
                        columnKey="lastName"
                        currentSortColumn={sortColumn}
                        currentSortDirection={sortDirection}
                        handleSort={handleSort}
                      >
                        LastName
                      </SortableColumnHeader>

                      <SortableColumnHeader
                        columnKey="email"
                        currentSortColumn={sortColumn}
                        currentSortDirection={sortDirection}
                        handleSort={handleSort}
                      >
                        Email
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
                          placeholder="Search FirstName"
                          value={searchTerms.firstName}
                          onChange={(e: any) =>
                            handleInputChange("firstName", e.target.value)
                          }
                        />
                      </th>
                      <th scope="col">
                        <CFormInput
                          placeholder="Search LastName"
                          value={searchTerms.lastName}
                          onChange={(e: any) =>
                            handleInputChange("lastName", e.target.value)
                          }
                        />
                      </th>
                      <th scope="col">
                        <CFormInput
                          placeholder="Search Email"
                          value={searchTerms.email}
                          onChange={(e: any) =>
                            handleInputChange("email", e.target.value)
                          }
                        />
                      </th>
                      <th scope="col">
                        <CFormSelect
                          value={searchTerms.status}
                          onChange={handleStatusChange}
                        >
                          <option value="">All</option>
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </CFormSelect>
                      </th>
                      <th scope="col">
                        <CButton className="me-2" color="light">
                          <FontAwesomeIcon
                            icon={faSearch}
                            onClick={handleActionSearch}
                          />
                        </CButton>
                        <CButton color="light">
                          <FontAwesomeIcon
                            icon={faTimes}
                            onClick={handleCancel}
                          />
                        </CButton>
                      </th>
                    </tr>
                  </thead>
                  {loading ? (
                    <SpinnerLoader />
                  ) : (
                    <tbody>
                      {users?.length > 0 ? (
                        users.map((user, index) => (
                          <tr key={index}>
                            <td>
                              {showPaginationInfo(pagination).startEntry +
                                index}
                            </td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.status}</td>
                            <td>
                              <div className="d-flex gap-2">
                                <CheckPermission permission="User_Edit">
                                  <Link to={`/user/edit/${user.id}`}>
                                    <CButton className="editButton">
                                      <FontAwesomeIcon icon={faEdit} />
                                    </CButton>
                                  </Link>
                                </CheckPermission>
                                <CheckPermission permission="User_Delete">
                                  <Userdelete
                                    id={user.id}
                                    fetchUsers={fetchUsers}
                                  />
                                </CheckPermission>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr className="no-records">
                          <td colSpan={6}>No matching records found</td>
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
    </div>
  );
};
