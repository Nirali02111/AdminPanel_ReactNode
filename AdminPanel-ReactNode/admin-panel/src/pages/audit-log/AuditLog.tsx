import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
  CHeader,
  CHeaderNav,
  CRow,
} from "@coreui/react";
import { AppBreadcrumb } from "../../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect, useState } from "react";
import { IAuditLog, getAuditLogs } from "../../services/auditlog.service";
import { IPagination, ISortOption } from "../../interfaces/common.interface";
import ExportComponent from "../../components/ExportComponent";
import SortableColumnHeader from "../../components/SortableColumnHeader";
import DateRangePicker from "../../components/DateRangePicker";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import { showPaginationInfo } from "../../components/showPaginationInfo";
import PaginationComponent from "../../components/paginationComponent";
interface IAuditLogSearchTerms extends Partial<IAuditLog> {
  startDate: string | Date;
  endDate: string | Date;
}
const defaultPagination = {
  page: 1,
  pageSize: 10,
  totalRecords: 0,
};
const defaultSearchTerm = {
  username: "",
  actionType: "",
  activity: "",
  startDate: new Date(),
  endDate: new Date(),
};
const AuditLog = () => {
  const [loading, setLoading] = useState(true);
  const [auditLogs, setAuditLogs] = useState<IAuditLog[]>([]);
  const [pagination, setPagination] = useState<IPagination>(defaultPagination);
  const [searchTerms, setSearchTerms] =
    useState<IAuditLogSearchTerms>(defaultSearchTerm);
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortColumn, setSortColumn] = useState("");
  useEffect(() => {
    fetchAuditLogs(pagination);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    pagination.page,
    pagination.pageSize,
    sortDirection,
    sortColumn,
    searchTerms.startDate,
    searchTerms.endDate,
  ]);

  const fetchAuditLogs = async (
    pagination: IPagination,
    sortOptionParam?: ISortOption,
    searchTermsParams?: IAuditLogSearchTerms
  ) => {
    try {
      setLoading(true);
      const search = searchTermsParams
        ? { ...searchTermsParams }
        : { ...searchTerms };
      const res = await getAuditLogs({
        ...search,
        ...pagination,
        orderBy: sortColumn,
        orderDirection: sortDirection,
      });
      let mappedLog = res.data.data.data.map((item: any) => ({
        ...item,
        showDetails: false,
      }));
      setAuditLogs(mappedLog);
      setPagination((previousValue: IPagination) => ({
        ...previousValue,
        totalRecords: res.data.data.totalRecords,
      }));
      setLoading(false);
    } catch (e) {
      setLoading(false);
    }
  };
  function handleKeyDown(_e: React.KeyboardEvent<HTMLDivElement>) {
    if (_e.code === "Enter") {
      fetchAuditLogs(pagination);
    }
  }
  const clear = () => {
    setSearchTerms(defaultSearchTerm);
    fetchAuditLogs(
      pagination,
      {
        orderDirection: "ASC",
        orderBy: "",
      },
      defaultSearchTerm
    );
  };
  function handleDetailsShow(id: number) {
    const logArr = auditLogs.map((item: IAuditLog) =>
      item.id === id ? { ...item, showDetails: !item.showDetails } : item
    );
    setAuditLogs(logArr);
  }
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
                <h3>Audit Logs</h3>
              </CCol>
            </CRow>
          </div>
          <CHeaderNav></CHeaderNav>
        </CContainer>
        <CContainer fluid>
          <AppBreadcrumb />
        </CContainer>
      </CHeader>
      <div className="body flex-grow-1 px-3">
        <CCard className="mb-4">
          <CCardBody>
            <div className="d-flex justify-content-between flex-wrap">
              <CForm className="row g-3 mb-4" style={{ width: "350px" }}>
                <CCol md={2}>Show</CCol>
                <CCol md={7}>
                  <CFormSelect
                    style={{ width: "200px" }}
                    size="sm"
                    onChange={(e) =>
                      setPagination({
                        ...pagination,
                        pageSize: parseInt(e.target.value),
                        page: 1,
                      })
                    }
                  >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </CFormSelect>
                </CCol>
                <CCol md={3}>
                  <span>entries</span>
                </CCol>
              </CForm>
              <ExportComponent fileName="AuditLog - Admin Panel" />
            </div>
            <div className="table-responsive">
              <table className="table table-bordered table-striped" id="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <SortableColumnHeader
                      columnKey="username"
                      currentSortColumn={sortColumn}
                      currentSortDirection={sortDirection}
                      handleSort={handleSort}
                    >
                      User Name
                    </SortableColumnHeader>
                    <SortableColumnHeader
                      columnKey="actionType"
                      currentSortColumn={sortColumn}
                      currentSortDirection={sortDirection}
                      handleSort={handleSort}
                    >
                      Action Type
                    </SortableColumnHeader>
                    <SortableColumnHeader
                      columnKey="activity"
                      currentSortColumn={sortColumn}
                      currentSortDirection={sortDirection}
                      handleSort={handleSort}
                    >
                      Activity
                    </SortableColumnHeader>
                    <SortableColumnHeader
                      columnKey="timestamp"
                      currentSortColumn={sortColumn}
                      currentSortDirection={sortDirection}
                      handleSort={handleSort}
                    >
                      Timestamp
                    </SortableColumnHeader>
                    <th scope="col">Details</th>
                  </tr>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col">
                      <CFormInput
                        placeholder="User Name"
                        onKeyDown={handleKeyDown}
                        value={searchTerms.username}
                        onChange={(e) =>
                          setSearchTerms({
                            ...searchTerms,
                            username: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th scope="col">
                      <CFormInput
                        placeholder="Action Type"
                        onKeyDown={handleKeyDown}
                        value={searchTerms.actionType}
                        onChange={(e) =>
                          setSearchTerms({
                            ...searchTerms,
                            actionType: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th scope="col">
                      <CFormInput
                        placeholder="Activity"
                        onKeyDown={handleKeyDown}
                        value={searchTerms.activity}
                        onChange={(e) =>
                          setSearchTerms({
                            ...searchTerms,
                            activity: e.target.value,
                          })
                        }
                      />
                    </th>
                    <th scope="col">
                      <div onKeyDown={handleKeyDown} className="d-flex">
                        <DateRangePicker
                          startDate={searchTerms.startDate}
                          endDate={searchTerms.endDate}
                          setStartDate={(d: any) => {
                            setSearchTerms((p: any) => ({
                              ...p,
                              startDate: d,
                            }));
                          }}
                          setEndDate={(d: any) => {
                            setSearchTerms((p: any) => ({ ...p, endDate: d }));
                          }}
                        />
                      </div>
                    </th>
                    <th scope="col">
                      <CButton
                        className="me-2"
                        color="light"
                        onClick={() => {
                          setPagination({ ...pagination, page: 1 });
                          fetchAuditLogs({ ...pagination, page: 1 });
                        }}
                      >
                        <FontAwesomeIcon icon={faSearch} />
                      </CButton>
                      <CButton
                        color="light"
                        onClick={() => {
                          clear();
                        }}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </CButton>
                    </th>
                  </tr>
                </thead>
                {loading ? (
                  <SpinnerLoader />
                ) : (
                  <tbody>
                    {auditLogs.length ? (
                      auditLogs.map((log, index) => (
                        <React.Fragment key={index}>
                          <tr id={"row" + log.id}>
                            <td>
                              {showPaginationInfo(pagination).startEntry +
                                index}
                            </td>
                            <td>{log.username}</td>
                            <td>{log.actionType}</td>
                            <td>{log.activity}</td>
                            <td>{new Date(log.timestamp).toLocaleString()}</td>
                            <td style={{ textAlign: "center" }}>
                              {log.details ? (
                                <div
                                  onClick={() => {
                                    handleDetailsShow(log.id);
                                  }}
                                  className="dt-control"
                                >
                                  +
                                </div>
                              ) : (
                                ""
                              )}
                            </td>
                          </tr>
                          {log.details && log.showDetails && (
                            <tr className="audit-details-row">
                              <td colSpan={6}>
                                <table
                                  className="table table-bordered table-striped"
                                  id="example"
                                >
                                  <thead>
                                    <tr>
                                      <th scope="col">Field Name</th>
                                      <th scope="col">Old Value</th>
                                      <th scope="col">New Value</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {log.details?.map(
                                      (item: any, i: number) => (
                                        <tr key={i}>
                                          <td>{item.fieldName}</td>
                                          <td>{item.oldValue?.toString()}</td>
                                          <td>{item.newValue?.toString()}</td>
                                        </tr>
                                      )
                                    )}
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
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
                onPageChange={(page) => {
                  setPagination({ ...pagination, page: page });
                }}
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

export default AuditLog;
