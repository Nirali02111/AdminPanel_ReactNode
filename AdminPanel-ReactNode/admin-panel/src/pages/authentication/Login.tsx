import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import { cilLockLocked, cilUser } from "@coreui/icons";

import ForgotPassword from "./ForgotPassword";
import { UserContext } from "../../context/UserContext";
import { loginAPI } from "../../services/account.service";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMssg, setErrorMssg] = useState("");
  const navigate = useNavigate();
  const { setLoggedInUser } = useContext(UserContext);
  const handleLogin = async () => {
    if (errorMssg) {
      setErrorMssg("");
    }
    if (!email) {
      setEmailError("Email is compulsory.");
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is compulsory.");
    } else {
      setPasswordError("");
    }

    if (!email || !password) {
      return;
    }
    const formData = {
      email: email,
      password: password,
    };
    try {
      const response = await loginAPI(formData);

      if (response.status === 200) {
        localStorage.setItem("Userdata", JSON.stringify(response.data.data));
        setLoggedInUser(response.data.data);
        navigate(`/dashboard`);
      } else {
      }
    } catch (err: any) {
      if (err.response.data.message) {
        setErrorMssg(err.response.data.message);
      } else {
        setErrorMssg("");
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleLogin();
    }
  };

  const handleForgotPasswordClick = () => {
    setShowForgotPasswordModal(true);
  };

  const handleCloseModal = () => {
    setShowForgotPasswordModal(false);
  };

  const location = useLocation();
  useEffect(() => {
    document.title = 'Login-Admin Panel';
  }, [location]);
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      {showForgotPasswordModal && <div className="overlay"></div>}
      {showForgotPasswordModal && <ForgotPassword onClose={handleCloseModal} />}
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">
                      Sign In to your account
                    </p>
                    <h6 className="mt-4">
                      Email<span className="text-danger">*</span>
                    </h6>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Email"
                        autoComplete="username"
                        value={email}
                        onChange={(e) => setemail(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                    </CInputGroup>
                    {emailError && (
                      <CFormFeedback className="small text-danger">
                        {emailError}
                      </CFormFeedback>
                    )}
                    <h6 className="mt-4">
                      Password<span className="text-danger">*</span>
                    </h6>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                      />
                    </CInputGroup>
                    {passwordError && (
                      <CFormFeedback className="small text-danger">
                        {passwordError}
                      </CFormFeedback>
                    )}
                    {errorMssg && (
                      <CFormFeedback className="small text-danger">
                        {errorMssg}
                      </CFormFeedback>
                    )}
                    <CRow className="mt-4">
                      <CCol xs={6}>
                        <CButton
                          color="primary"
                          className="px-4"
                          onClick={handleLogin}
                        >
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton
                          color="link"
                          className="px-0"
                          onClick={handleForgotPasswordClick}
                        >
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5"
                style={{ width: "44%" }}
              ></CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
