import React, { ChangeEvent, useContext, useEffect, useState } from "react";
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
  CHeader,
  CRow,
} from "@coreui/react";
import { useNavigate, useParams } from "react-router-dom";
import { AppBreadcrumb, SmartDropdown } from "../../components";
import useAlert from "../../hooks/useAlert";
import AppImage from "../../components/AppImage";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";

import {
  addUserAPI,
  editUserAPI,
  getUserById,
  userRoles,
} from "../../services/userService";
import { UserContext } from "../../context/UserContext";

const Usersave = () => {
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastName, setLastName] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState<Role[]>([]);
  const [roleId, setRoleId] = useState<number | "">("");
  const [password, setPassword] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [emailError, setEmailError] = useState("");
  const [roleError, setRoleError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmpasswordError, setConfirmPasswordError] = useState("");
  const [profile, setProfile] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("Active");
  const [messageerror, setMessageError] = useState("");

  const [profileImageError, setProfileImageError] = useState("");
  const { logMessage } = useAlert();
  const navigate = useNavigate();
  const { id } = useParams();
  const { setAlertMessage } = useContext(UserContext);
  interface Role {
    id: string;
    name: string;
  }

  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };
  const handleRoleChange = (item: any) => {
    const value = item?.value;
    setRoleId(value === "" ? "" : parseInt(value, 10));
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setProfileImage(files[0]);
    }
  };
  const validateEmailFormat = (email: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePasswordFormat = (password: any) => {
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,20}$/;
    // /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[\#\?\!\@\$\%\^\&\*\-]).{6,20}$/;
    return passwordRegex.test(password);
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formIsValid = true;

    if (messageerror) {
      setMessageError("");
    }
    if (!firstName) {
      setFirstNameError("First Name is required");
      formIsValid = false;
    } else {
      setFirstNameError("");
    }
    if (!lastName) {
      setLastNameError("Last Name is required");
      formIsValid = false;
    } else {
      setLastNameError("");
    }

    if (!email) {
      setEmailError("Email is required");
      formIsValid = false;
    } else if (!validateEmailFormat(email)) {
      setEmailError("Please enter a valid email address.");
      formIsValid = false;
    } else {
      setEmailError("");
    }
    if (!roleId) {
      setRoleError("Role is required");
      formIsValid = false;
    } else {
      setRoleError("");
    }
    if (!password && !id) {
      setPasswordError("Password is required");
      formIsValid = false;
    } else if (!validatePasswordFormat(password) && !id) {
      setPasswordError(
        "Password should be minimum 6 and maximum 20 characters and should contain atleast one uppercase letter,one lowercase letter and one numeric value. "
      );
      formIsValid = false;
    } else {
      setPasswordError("");
    }
    if (!profileImage) {
      setProfileImageError("Profile Image is required");
      formIsValid = false;
    } else {
      setProfileImageError("");
    }
    if (!confirmpassword && !id) {
      setConfirmPasswordError("Confirm Password is required");
      formIsValid = false;
    } else if (confirmpassword !== password) {
      setConfirmPasswordError(
        "Password and confirmation password do not match."
      );
      formIsValid = false;
    } else {
      setConfirmPasswordError("");
    }
    if (formIsValid) {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("roleId", String(roleId));
      formData.append("status", status);
      if (!id) {
        formData.append("password", password);
      }

      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      try {
        let response: any;
        if (id) {
          response = await editUserAPI(formData, id);
        } else {
          response = await addUserAPI(formData);
        }

        if (response.status === 200) {
          setAlertMessage(response.data.message);
          navigate(`/users`);
        }
        logMessage(response.data.message);
      } catch (error: any) {
        setMessageError(error.response.data.message);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          setLoading(true);
          const response = await getUserById(id);
          const data = response.data.data;
          setFirstName(data.firstName);
          setLastName(data.lastName);
          setEmail(data.email);
          setRoleId(data.roleId);
          setProfileImage(data.profileImage);
          setStatus(data.status);
          setProfile(data.profileImage);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await userRoles();
        setRoles(response.data.data.data);
      } catch (error) {}
    };

    fetchRoles();
  }, []);
  const handleFormCancel = () => {
    navigate("/users");
  };

  const transformedRoles = roles?.map((item) => ({
    label: item.name,
    value: item.id,
  }));

  const transformedRoleValue = () => {
    const filteredData = roles?.filter((item) => item.id === roleId);
    const mappedData = filteredData?.map((item) => ({
      label: item.name,
      value: item.id,
    }));

    // Assuming we want a single object and there should only be one matching item
    return mappedData.length > 0 ? mappedData[0] : null;
  };

  return (
    <>
      <CHeader className="mb-4">
        <CContainer fluid>
          <div>
            <CRow>
              <CCol>
                <h3>Users</h3>
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
                    <CCol md={4}>
                      <label>
                        {" "}
                        First Name<span style={{ color: "red" }}>*</span>
                      </label>
                      <CFormInput
                        type="text"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="col-6"
                      />
                      {firstNameError && (
                        <CFormFeedback
                          className="small text-danger"
                          style={{ marginBottom: "10px" }}
                        >
                          {firstNameError}
                        </CFormFeedback>
                      )}
                    </CCol>

                    <CCol md={4}>
                      <label>
                        {" "}
                        Last Name<span style={{ color: "red" }}>*</span>
                      </label>
                      <CFormInput
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                      {lastNameError && (
                        <CFormFeedback
                          className="small text-danger"
                          style={{ marginBottom: "10px" }}
                        >
                          {lastNameError}
                        </CFormFeedback>
                      )}
                    </CCol>

                    <CCol md={4}>
                      <label>
                        {" "}
                        Email<span style={{ color: "red" }}>*</span>
                      </label>
                      <CFormInput
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {emailError && (
                        <CFormFeedback
                          className="small text-danger"
                          style={{ marginBottom: "10px" }}
                        >
                          {emailError}
                        </CFormFeedback>
                      )}
                    </CCol>

                    {/* <CCol md={4}>
                      <label>
                        {" "}
                        Role<span style={{ color: "red" }}>*</span>
                      </label>
                      <CFormSelect value={roleId} onChange={handleRoleChange}>
                        <option value="">Select Role</option>
                        {roles.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        ))}
                      </CFormSelect>
                      {roleError && (
                        <CFormFeedback
                          className="small text-danger"
                          style={{ marginBottom: "10px" }}
                        >
                          {roleError}
                        </CFormFeedback>
                      )}
                    </CCol> */}

                    <CCol md={4}>
                      <label>
                        {" "}
                        Role<span style={{ color: "red" }}>*</span>
                      </label>
                      <SmartDropdown
                        options={transformedRoles}
                        onChange={handleRoleChange}
                        value={transformedRoleValue()}
                      />
                      {roleError && (
                        <CFormFeedback
                          className="small text-danger"
                          style={{ marginBottom: "10px" }}
                        >
                          {roleError}
                        </CFormFeedback>
                      )}
                    </CCol>

                    {!id && (
                      <>
                        <CCol md={4}>
                          <label>
                            {" "}
                            Password<span style={{ color: "red" }}>*</span>
                          </label>
                          <CFormInput
                            type="password"
                            placeholder="Password"
                            autoComplete="Password"
                            value={password}
                            onChange={handlePasswordChange}
                          />
                          {passwordError && (
                            <CFormFeedback className="small text-danger">
                              {passwordError}
                            </CFormFeedback>
                          )}
                        </CCol>
                        <CCol md={4}>
                          <label>
                            Confirm Password
                            <span style={{ color: "red" }}>*</span>
                          </label>
                          <CFormInput
                            type="password"
                            placeholder="Confirm Password"
                            autoComplete="Password"
                            value={confirmpassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                          {confirmpasswordError && (
                            <CFormFeedback className="small text-danger">
                              {confirmpasswordError}
                            </CFormFeedback>
                          )}
                        </CCol>
                      </>
                    )}
                    {id && (
                      <CCol md={4}>
                        <label>
                          Status<span style={{ color: "red" }}>*</span>
                        </label>
                        <CFormSelect
                          value={status}
                          onChange={handleStatusChange}
                        >
                          <option value="Active">Active</option>
                          <option value="InActive">InActive</option>
                        </CFormSelect>
                      </CCol>
                    )}
                    <CCol md={6}>
                      <label>
                        {" "}
                        Profile Image<span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        id="profileImage"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      {profileImageError && (
                        <CFormFeedback
                          className="small text-danger"
                          style={{ marginBottom: "10px" }}
                        >
                          {profileImageError}
                        </CFormFeedback>
                      )}
                    </CCol>
                    <CCol md={4}>
                      <AppImage
                        src={profile as string}
                        alt="profile"
                        height={100}
                        width={100}
                      />
                    </CCol>
                    <div></div>
                    {messageerror && (
                      <CFormFeedback
                        className="small text-danger"
                        style={{ marginBottom: "10px" }}
                      >
                        {messageerror}
                      </CFormFeedback>
                    )}
                    <CCol md={12}>
                      <CButton color="primary" type="submit" className="px-4">
                        {id ? "Save Changes" : "Add User"}
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

export default Usersave;
