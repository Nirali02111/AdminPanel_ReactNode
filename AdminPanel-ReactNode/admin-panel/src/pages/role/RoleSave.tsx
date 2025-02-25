import React, {
  ChangeEvent,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormFeedback,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CHeader,
  CRow,
} from "@coreui/react";

import { useNavigate, useParams } from "react-router-dom";
import { AppBreadcrumb, PermissionTree } from "../../components";
import useAlert from "../../hooks/useAlert";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import {
  addRoleAPI,
  editRoleAPI,
  rolePermissionAPI,
  rolesAPI,
  userpermissionAPI,
} from "../../services/roleService";
import { UserContext } from "../../context/UserContext";

const RoleSave = () => {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [status, setStatus] = useState("Active");
  const [shortDescription, setShortDescription] = useState("");
  const [permissions, setPermissions] = useState<number[]>([]);
  const [permissionsError, setPermissionsError] = useState("");
  const [allPermission, setAllPermission] = useState<any>([]);
  const [assignedPermissions, setAssignedPermissions] = useState<any>([]);
  const [errorMessage, setErrorMessage] = useState("");
  const { logMessage } = useAlert();
  const navigate = useNavigate();
  const { id } = useParams();
  const { setAlertMessage } = useContext(UserContext);

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value.trim());
    setNameError(value.trim() ? "" : "Name is required.");
  };

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };
  const handleShortDescriptionChange = (
    e: ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = e.target.value;
    setShortDescription(value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formIsValid = true;

    const permissions: any = [
      ...allPermission
        .filter((ele: any) => ele.checked)
        .map((ele: any) => ele.id),
    ];

    // Validate all fields before submitting
    if (errorMessage) {
      setErrorMessage("");
    }
    if (!name) {
      setNameError("Name is required.");
      formIsValid = false;
    } else {
      setNameError("");
    }
    if (permissions.length === 0) {
      setPermissionsError("Please select a permission");
      formIsValid = false;
    } else {
      setPermissionsError("");
    }
    const formData: {
      name?: string;
      status?: string;
      shortDescription?: string;
      permissions?: string[];
    } = {};

    formData.name = name ?? formData.name;
    formData.status = status ?? formData.status;
    formData.permissions = permissions ?? formData.permissions;
    if (shortDescription) {
      formData.shortDescription = shortDescription;
    }

    if (formIsValid) {
      try {
        let response;
        if (id) {
          response = await editRoleAPI(formData, id);
        } else {
          response = await addRoleAPI(formData);
        }
        if (response.status === 200) {
          // Clear form fields on successful submission
          setName("");
          setStatus("");
          setShortDescription("");
          setPermissions([]);
          setAlertMessage(response.data.message);
          navigate(`/role`);
        } else {
        }
        logMessage(response.data.message);
      } catch (error: any) {
        setErrorMessage(error.response.data.message);
      }
    }
  };

  const fetchAssignedPermissions = async () => {
    setLoading(true);
    const response = await rolePermissionAPI();
    const data = response.data.data;
    setAssignedPermissions(data);
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const permissionCopy: any = allPermission.map((ele: any) =>
      ele.name === e.target.name ? { ...ele, checked: !ele.checked } : ele
    );
    setAllPermission(permissionCopy);
  };

  useEffect(() => {
    fetchAssignedPermissions();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await userpermissionAPI();
      setPermissions(
        response.data.data.map((permission: any) => permission.id)
      );
      let permissionsarray: any = response.data.data;

      if (id) {
        const response = await rolesAPI(id);

        const data = response.data.data;
        setName(data.name);
        setShortDescription(data.shortDescription);
        setStatus(data.status);

        const permissionToSet = permissionsarray.map((permission: any) => {
          const found = data.permissions.find(
            (assignedPermission: any) => assignedPermission.id === permission.id
          );
          if (found) {
            return { ...permission, checked: true };
          } else {
            return { ...permission, checked: false };
          }
        });

        setAllPermission(permissionToSet);
      } else {
        setAllPermission(() =>
          response.data.data.map((ele: any) => ({ ...ele, checked: false }))
        );
      }

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);
  const handleFormCancel = () => {
    navigate("/role");
  };

  const handleToggleChildren = (key: number, value: boolean) => {
    let permissionCopy = [...allPermission]; // Initialize outside the loop
    treeViewData[key].children.forEach((item: any) => {
      permissionCopy = permissionCopy.map((ele: any) =>
        ele.name === `${treeViewData[key].moduleName}_${item.name}`
          ? { ...ele, checked: !value }
          : ele
      );
    });

    setAllPermission(permissionCopy);
  };
  const transformData = (data: any) => {
    const result: any = [];

    data.forEach((item: any) => {
      const [moduleName, actionName] = item.name.split("_");

      let module = result.find((mod: any) => mod.moduleName === moduleName);
      if (!module) {
        module = { moduleName: moduleName, children: [] };
        result.push(module);
      }

      module.children.push({
        id: item.id,
        name: actionName,
        checked: item.checked,
      });
    });

    return result;
  };

  const treeViewData = useMemo(
    () => transformData(allPermission),
    [allPermission]
  );

  return (
    <>
      <CHeader className="mb-4">
        <CContainer fluid>
          <div>
            <CRow>
              <CCol>
                <h3>Roles</h3>
              </CCol>
            </CRow>
          </div>
        </CContainer>
        <CContainer fluid>
          <AppBreadcrumb />
        </CContainer>
      </CHeader>
      <div className="bg-light  d-flex flex-row ">
        <CContainer>
          <CRow className="justify-content-center"></CRow>
          <CCol>
            <CCard className="mb-4 ">
              <CCardBody>
                {loading ? (
                  <SpinnerLoader />
                ) : (
                  <CForm onSubmit={handleSubmit} className="row g-3">
                    {errorMessage && (
                      <CFormFeedback
                        className="small text-danger"
                        style={{ marginBottom: "10px" }}
                      >
                        {errorMessage}
                      </CFormFeedback>
                    )}
                    <CCol md={6}>
                      <label>
                        Name<span style={{ color: "red" }}>*</span>
                      </label>
                      <CFormInput
                        type="text"
                        placeholder="Role Name"
                        value={name}
                        onChange={handleNameChange}
                      />
                      {nameError && (
                        <CFormFeedback
                          className="small text-danger"
                          style={{ marginBottom: "10px" }}
                        >
                          {nameError}
                        </CFormFeedback>
                      )}
                    </CCol>

                    <CCol md={6}>
                      <label>
                        Status<span style={{ color: "red" }}>*</span>
                      </label>
                      <CFormSelect value={status} onChange={handleStatusChange}>
                        <option value="Active">Active</option>
                        <option value="InActive">InActive</option>
                      </CFormSelect>
                    </CCol>

                    <CCol md={6}>
                      <CFormTextarea
                        placeholder="Short description"
                        label="Short description"
                        value={shortDescription}
                        onChange={handleShortDescriptionChange}
                      />
                    </CCol>

                    <h3>Permissions</h3>

                    {permissionsError && (
                      <CFormFeedback
                        className="small text-danger"
                        style={{ marginBottom: "10px" }}
                      >
                        {permissionsError}
                      </CFormFeedback>
                    )}
                    {/* {allPermission.map((ele: any) => (
                      <div key={ele.id}>
                        <input
                          type="checkbox"
                          checked={ele.checked}
                          onChange={handleChange}
                          id={ele.name}
                          name={ele.name}
                        />
                        <label htmlFor={ele.name}>
                          {ele.name.split("_").join(" ")}
                        </label>
                      </div>
                    ))} */}

                    <div>
                      <PermissionTree
                        treeData={treeViewData}
                        handleChange={handleChange}
                        handleToggleAll={handleToggleChildren}
                      />
                    </div>
                    <CCol xs={12}>
                      <CButton color="primary" type="submit" className="px-4">
                        {id ? "Save Changes" : "Add Role"}
                      </CButton>
                      <CButton
                        color="secondary"
                        className="px-4"
                        style={{ marginLeft: "10px" }}
                        onClick={handleFormCancel}
                      >
                        Cancel
                      </CButton>
                    </CCol>
                  </CForm>
                )}
              </CCardBody>
            </CCard>
          </CCol>
        </CContainer>
      </div>
    </>
  );
};

export default RoleSave;
