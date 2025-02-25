import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormFeedback,
  CFormInput,
  CHeader,
  CRow,
} from "@coreui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppBreadcrumb } from "../../components";
import { changePasswordAPI } from "../../services/account.service";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [messageError, setMessageError] = useState("");
  const [oldPasswordError, setOldPasswordError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formIsValid = true;
    if (!oldPassword) {
      setOldPasswordError("Please enter old password");
      formIsValid = false;
    } else {
      setOldPasswordError("");
    }
    if (!newPassword) {
      setNewPasswordError("Please enter new password");
      formIsValid = false;
    } else {
      setNewPasswordError("");
    }
    if (!confirmPassword) {
      setConfirmPasswordError("Please enter confirm password");
      formIsValid = false;
    } else if (newPassword !== confirmPassword) {
      setConfirmPasswordError(
        "New password and Confirm password should be the same"
      );
      formIsValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (formIsValid) {
      const formData = {
        oldPassword: oldPassword,
        newPassword: newPassword,
      };
      try {
        const response = await changePasswordAPI(formData);

        if (response.status === 200) {
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
          navigate("/dashboard");
        }
      } catch (err: any) {
        setMessageError(err.response.data.message);
      }
    }
  };
  return (
    <>
      <CHeader className="mb-4">
        <CContainer fluid>
          <div>
            <CRow>
              <CCol>
                <h3>Change Password</h3>
              </CCol>
            </CRow>
          </div>
        </CContainer>
        <CContainer fluid>
          <AppBreadcrumb />
        </CContainer>
      </CHeader>

      <CCard className="mb-4">
        <CCardBody>
          <CForm onSubmit={handleSubmit} className="row g-3">
            <CCol md={4}>
              <label>
                Old Password<span style={{ color: "red" }}>*</span>
              </label>
              <CFormInput
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              {oldPasswordError && (
                <CFormFeedback
                  className="small text-danger"
                  style={{ marginBottom: "10px" }}
                >
                  {oldPasswordError}
                </CFormFeedback>
              )}
            </CCol>

            <CCol md={4}>
              <label>
                New Password<span style={{ color: "red" }}>*</span>
              </label>
              <CFormInput
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              {newPasswordError && (
                <CFormFeedback
                  className="small text-danger"
                  style={{ marginBottom: "10px" }}
                >
                  {newPasswordError}
                </CFormFeedback>
              )}
            </CCol>
            <CCol md={4}>
              <label>
                Confirm Password<span style={{ color: "red" }}>*</span>
              </label>
              <CFormInput
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {confirmPasswordError && (
                <CFormFeedback
                  className="small text-danger"
                  style={{ marginBottom: "10px" }}
                >
                  {confirmPasswordError}
                </CFormFeedback>
              )}
            </CCol>

            <CCol>
              {messageError && (
                <CFormFeedback
                  className="small text-danger"
                  style={{ marginBottom: "10px" }}
                >
                  {messageError}
                </CFormFeedback>
              )}
              <CButton type="submit" className="me-2">
                Submit
              </CButton>
              <Link className="btn btn-secondary" to="/dashboard">
                Cancel
              </Link>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </>
  );
};

export default ChangePassword;
