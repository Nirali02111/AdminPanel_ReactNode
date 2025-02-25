import React, { useState } from "react";
import { cilUser } from "@coreui/icons";
import {
  CFormFeedback,
  CFormInput,
  CInputGroup,
  CInputGroupText,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { forgotPasswordAPI } from "../../services/account.service";

interface ForgotPasswordProps {
  onClose: () => void; // Function to close the modal
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [emailSentSuccess, setEmailSentSuccess] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [emailError, setEmailError] = useState("");
  const forgotPasswordLogo = "/assets/images/forgotpassword.png";

  const validateEmailFormat = (email: any) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleForgotPasswordSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    let formIsValid = true;
    if (!email) {
      setEmailError("Email is required");
      formIsValid = false;
    } else if (!validateEmailFormat(email)) {
      setEmailError("Please enter a valid email address.");
      formIsValid = false;
    } else {
      setEmailError("");
    }
    const formData = {
      email: email,
    };

    if (formIsValid) {
      try {
        const response = await forgotPasswordAPI(formData);
        if (response.status === 200) {
          setEmailSentSuccess(true);
          setTimeout(() => {
            onClose();
          }, 3000);
        } else {
          // Handle any errors that occurred during the request
          setEmailSentSuccess(false);
        }
      } catch (error) {
        setShowErrorMessage(true);
      }
    }
  };

  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content position-relative">
          {/* <button
            type="button"
            className="btn-close position-absolute top-0 end-0 m-3"
            onClick={onClose}
            aria-label="Close"
          ></button> */}
          <div className="modal-body text-center">
            <img
              src={forgotPasswordLogo}
              alt="Forgot Password"
              style={{ width: "130px", height: "130px" }}
            />
            <h5 className="modal-title mt-3">Forgot Password</h5>
            <p>
              Enter the email address associated with your account and we will
              send you a link to reset your password.
            </p>
            <form id="forgotPasswordForm" onSubmit={handleForgotPasswordSubmit}>
              <CInputGroup className="mb-3 input-group-sm">
                <CInputGroupText>
                  <CIcon icon={cilUser} />
                </CInputGroupText>
                <CFormInput
                  placeholder="Email"
                  autoComplete="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </CInputGroup>
              {emailError && (
                <CFormFeedback className="small text-danger">
                  {emailError}
                </CFormFeedback>
              )}
              {emailSentSuccess && (
                <p className="mt-2" style={{ color: "green" }}>
                  Password reset email sent successfully!
                </p>
              )}
              {!emailSentSuccess && email !== "" && showErrorMessage && (
                <p className="mt-2" style={{ color: "red" }}>
                  Error while sending password reset email. Please try again.
                </p>
              )}
              <div>
                <button type="submit" className="mt-2  btn btn-primary">
                  Submit
                </button>
                <button
                  className="mt-2 btn btn-danger"
                  style={{ marginLeft: "10px" }}
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
