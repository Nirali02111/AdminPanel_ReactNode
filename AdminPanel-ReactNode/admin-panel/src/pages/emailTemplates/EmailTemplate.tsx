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
import EmailTemplatedelete from "./EmailTemplatedelete";
import PaginationSelect from "../../components/PaginationSelect";
import PaginationComponent from "../../components/paginationComponent";
import SortableColumnHeader from "../../components/SortableColumnHeader";
import ExportComponent from "../../components/ExportComponent";
import AppAlert from "../../components/AppAlert";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import CheckPermission from "../../components/CheckPermission";
import { getEmailTemplateAPI } from "../../services/emailTemplateService";
import { UserContext } from "../../context/UserContext";
import useAlert from "../../hooks/useAlert";
import { showPaginationInfo } from "../../components/showPaginationInfo";
import { IPagination } from "../../interfaces/common.interface";

interface EmailTemplate {
  id: number;
  title: string;
  key: string;
  subject: string;
  fromEmail: string;
  status: string;
}
const defaultPagination = {
  page: 1,
  pageSize: 10,
  totalRecords: 0,
};
const defaultSearchTerm = {
  title: "",
  key: "",
  subject: "",
  fromEmail: "",
  status: "",
};

const EmailTemplate = () => {
  const [loading, setLoading] = useState(true);
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([]);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortColumn, setSortColumn] = useState("");
  const navigate = useNavigate();
  const [searchTerms, setSearchTerms] =
    useState<Record<string, string>>(defaultSearchTerm);
  const [pagination, setPagination] = useState<IPagination>(defaultPagination);
  const { alertMessage, setAlertMessage } = useContext(UserContext);
  const { message, logMessage } = useAlert();
  const handleInputChange = (field: keyof EmailTemplate, value: string) => {
    setSearchTerms({
      ...searchTerms,
      [field]: value,
    });
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

  const fetchEmailTemplates = async (search?: any) => {
    try {
      setLoading(true);
      const response = await getEmailTemplateAPI({
        ...pagination,
        orderBy: sortColumn,
        orderDirection: sortDirection,
        ...(search ? search : searchTerms),
      });

      const data = response.data.data;
      setEmailTemplates(data.data);
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

  useEffect(() => {
    fetchEmailTemplates();
  }, [pagination.page, pagination.pageSize, sortDirection, sortColumn]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    handleInputChange("status", value);
  };

  const handleActionSearch = async () => {
    if (pagination.page === 1) {
      fetchEmailTemplates();
    } else {
      setPagination((previousValue: IPagination) => ({
        ...previousValue,
        page: 1,
      }));
    }
  };
  const handleCancel = () => {
    setSearchTerms(defaultSearchTerm);
    fetchEmailTemplates(defaultSearchTerm);
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
                <h3>EmailTemplates</h3>
              </CCol>
            </CRow>
          </div>
          <CHeaderNav>
            <CNavItem>
              <CheckPermission permission="EmailTemplate_Add">
                <Link to="/emailtemplate/add">
                  <CButton color="primary" className="px-4">
                    Add EmailTemplate
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
              <ExportComponent fileName="EmailTemplate - Admin Panel" />
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
                      columnKey="subject"
                      currentSortColumn={sortColumn}
                      currentSortDirection={sortDirection}
                      handleSort={handleSort}
                    >
                      Subject
                    </SortableColumnHeader>
                    <SortableColumnHeader
                      columnKey="fromEmail"
                      currentSortColumn={sortColumn}
                      currentSortDirection={sortDirection}
                      handleSort={handleSort}
                    >
                      From Email
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
                        onChange={(e) =>
                          handleInputChange("title", e.target.value)
                        }
                      />
                    </th>
                    <th scope="col">
                      <CFormInput
                        placeholder="Search Key"
                        value={searchTerms.key}
                        onChange={(e) =>
                          handleInputChange("key", e.target.value)
                        }
                      />
                    </th>
                    <th scope="col">
                      <CFormInput
                        placeholder="Search Subject"
                        value={searchTerms.subject}
                        onChange={(e) =>
                          handleInputChange("subject", e.target.value)
                        }
                      />
                    </th>
                    <th scope="col">
                      <CFormInput
                        placeholder="Search From Email"
                        value={searchTerms.fromEmail}
                        onChange={(e) =>
                          handleInputChange("fromEmail", e.target.value)
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
                    {emailTemplates?.length > 0 ? (
                      emailTemplates.map((template, index) => (
                        <tr key={index}>
                          <td>
                            {showPaginationInfo(pagination).startEntry + index}
                          </td>
                          <td>{template.title}</td>
                          <td>{template.key}</td>
                          <td>{template.subject}</td>
                          <td>{template.fromEmail}</td>
                          <td>{template.status}</td>
                          <td>
                            <div className="d-flex gap-2">
                              <CheckPermission permission="EmailTemplate_Edit">
                                <Link to={`/emailtemplate/edit/${template.id}`}>
                                  <CButton className="editButton">
                                    <FontAwesomeIcon icon={faEdit} />
                                  </CButton>
                                </Link>
                              </CheckPermission>
                              <CheckPermission permission="EmailTemplate_Delete">
                                <EmailTemplatedelete
                                  id={template.id}
                                  fetchEmailTemplates={fetchEmailTemplates}
                                />
                              </CheckPermission>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr className="no-records">
                        <td colSpan={7}>No records available</td>
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

export default EmailTemplate;
