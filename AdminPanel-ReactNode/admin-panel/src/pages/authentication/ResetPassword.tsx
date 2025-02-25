// import React from 'react';

import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormFeedback,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked } from "@coreui/icons";
import { resetPasswordbyId } from "../../services/account.service";
const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showMessage, setShowMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const { id } = useParams();
  const resetPasswordlogo = "/assets/images/reset2.png";
  const validatePasswordFormat = (password: any) => {
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,20}$/;
    // /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[\#\?\!\@\$\%\^\&\*\-]).{6,20}$/;
    return passwordRegex.test(password);
  };
  const handleResetPassword = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    setShowMessage("");
    let isformValid = true;
    if (!password) {
      isformValid = false;
      setPasswordError("Password should not be empty");
    } else if (!validatePasswordFormat(password)) {
      isformValid = false;
      setPasswordError(
        "Password should be minimum 6 and maximum 20 characters and should contain atleast one uppercase letter,one lowercase letter and one numeric value. "
      );
    } else {
      setPasswordError("");
    }

    if (!confirmPassword) {
      isformValid = false;
      setConfirmPasswordError("Confirm Password should not be empty");
    } else if (password !== confirmPassword) {
      isformValid = false;
      setConfirmPasswordError(
        "Password and confirm password should be the same"
      );
    } else {
      setConfirmPasswordError("");
    }
    if (isformValid) {
      try {
        const formData = {
          password,
        };
        const response = await resetPasswordbyId(formData, id);

        if (response.status == 201) {
          setShowMessage("Password reset successful");
        } else {
        }
      } catch (error) {}
    }
  };
  const location = useLocation();
  useEffect(() => {
    document.title = "Reset Password-Admin Panel";
  }, [location]);
  return (
    <div
      className="bg-light d-flex flex-row align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <CContainer
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CRow className="justify-content-center"></CRow>
        <CCol md={8}>
          <CCardGroup>
            <CCard className="p-4">
              <CCardBody>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <img
                      src={resetPasswordlogo}
                      alt="Forgot Password"
                      style={{ width: "170px", height: "170px" }}
                    />
                  </div>
                  <CForm onSubmit={handleResetPassword}>
                    <h1>Reset Password</h1>

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="New Password"
                        autoComplete="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>
                    {passwordError && (
                      <CFormFeedback
                        className="small text-danger"
                        style={{ marginBottom: "10px" }}
                      >
                        {passwordError}
                      </CFormFeedback>
                    )}
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Confirm Password"
                        autoComplete="current-password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                      />
                    </CInputGroup>
                    {confirmPasswordError && (
                      <CFormFeedback
                        className="small text-danger"
                        style={{ marginBottom: "10px" }}
                      >
                        {confirmPasswordError}
                      </CFormFeedback>
                    )}
                    <p style={{ color: "green" }}>{showMessage}</p>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4">
                          Submit
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <Link
                          to="/account/login"
                          style={{ textDecoration: "none" }}
                        >
                          <CButton
                            color="link"
                            className="px-0"
                            style={{ fontSize: "14px" }}
                          >
                            Back to Login
                          </CButton>
                        </Link>
                      </CCol>
                    </CRow>
                  </CForm>
                </div>{" "}
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CContainer>
    </div>
  );
};

export default ResetPassword;
