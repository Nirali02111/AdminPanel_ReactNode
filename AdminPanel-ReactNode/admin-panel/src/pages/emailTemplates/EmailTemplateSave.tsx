import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormCheck,
  CFormFeedback,
  CFormInput,
  CFormSelect,
  CHeader,
  CRow,
} from "@coreui/react";
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppBreadcrumb } from "../../components";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import useAlert from "../../hooks/useAlert";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import {
  addEmailTemplateAPI,
  editEmailTemplateAPI,
  getEmailTemplatebyId,
} from "../../services/emailTemplateService";
import { UserContext } from "../../context/UserContext";

const EmailTemplateSave = () => {
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState("");
  const [title, setTitle] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Active");
  const [subject, setSubject] = useState("");
  const [isManualMail, setIsManualMail] = useState(false);
  const [isContactUsMail, setIsContactUsMail] = useState(false);
  const [keyError, setKeyError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [subjectError, setSubjectError] = useState("");
  const [bodyError, setBodyError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();
  const { logMessage } = useAlert();
  const navigate = useNavigate();
  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value.trim());
  };
  const [editorData, setEditorData] = useState("");
  const { setAlertMessage } = useContext(UserContext);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formIsValid = true;
    if (errorMessage) {
      setErrorMessage("");
    }
    if (!key) {
      setKeyError("Key is required");
      formIsValid = false;
    } else {
      setKeyError("");
    }
    if (!title) {
      setTitleError("Title is required");
      formIsValid = false;
    } else {
      setTitleError("");
    }
    if (!email) {
      setEmailError("Email is required");
      formIsValid = false;
    } else {
      setEmailError("");
    }
    if (!name) {
      setNameError("From name is required");
      formIsValid = false;
    } else {
      setNameError("");
    }
    if (!subject) {
      setSubjectError("Subject is required");
      formIsValid = false;
    } else {
      setSubjectError("");
    }
    if (!editorData) {
      setBodyError("Body is required");
      formIsValid = false;
    } else {
      setBodyError("");
    }
    const formData = {
      key: key,
      title: title,
      fromEmail: email,
      fromName: name,
      status: status,
      subject: subject,
      body: editorData,
      isManualMail: isManualMail,
      isContactUsMail: isContactUsMail,
    };
    if (formIsValid) {
      try {
        let response;
        if (id) {
          response = await editEmailTemplateAPI(formData, id);
        } else {
          response = await addEmailTemplateAPI(formData);
        }

        if (response.status === 200) {
          setKey("");
          setEditorData("");
          setEmail("");
          setTitle("");
          setName("");
          setStatus("");
          setIsContactUsMail(false);
          setIsManualMail(false);
          setSubject("");
          setAlertMessage(response.data.message);
          navigate("/emailTemplate");
        } else {
        }
        logMessage(response.data.message);
      } catch (error: any) {
        setErrorMessage(error.response.data.message);
      }
    }
  };
  const handleManualMailChange = () => {
    setIsManualMail(!isManualMail); // Toggle the value
  };

  const handleContactUsMailChange = () => {
    setIsContactUsMail(!isContactUsMail); // Toggle the value
  };
  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData();
    setEditorData(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (id) {
          const response = await getEmailTemplatebyId(id);

          const data = response.data.data;

          setKey(data.key);
          setEditorData(data.body);
          setEmail(data.fromEmail);
          setTitle(data.title);
          setName(data.fromName);
          setStatus(data.status);
          setIsContactUsMail(data.isContactUsMail);
          setIsManualMail(data.isManualMail);
          setSubject(data.subject);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleFormCancel = () => {
    navigate("/emailtemplate");
  };
  return (
    <div>
      <CHeader className="mb-4">
        <CContainer fluid>
          <div>
            <CRow>
              <CCol>
                <h3>Email Template</h3>
              </CCol>
            </CRow>
          </div>
        </CContainer>
        <CContainer fluid>
          <AppBreadcrumb />
        </CContainer>
      </CHeader>
      <CContainer>
        <CRow className="justify-content-center"></CRow>
        <CCol>
          <CCard className="mb-4 ">
            <CCardBody>
              {loading ? (
                <SpinnerLoader />
              ) : (
                <CForm className="row g-3" onSubmit={handleSubmit}>
                  {errorMessage && (
                    <CFormFeedback
                      className="small text-danger"
                      style={{ marginBottom: "10px" }}
                    >
                      {errorMessage}
                    </CFormFeedback>
                  )}
                  <CCol md={4}>
                    <label>
                      Key<span style={{ color: "red" }}>*</span>
                    </label>

                    {id ? (
                      <CFormInput
                        type="text"
                        placeholder="Key"
                        value={key}
                        readOnly
                      />
                    ) : (
                      <CFormInput
                        type="text"
                        placeholder="Key"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                      />
                    )}
                    {keyError && (
                      <CFormFeedback
                        className="small text-danger"
                        style={{ marginBottom: "10px" }}
                      >
                        {keyError}
                      </CFormFeedback>
                    )}
                  </CCol>
                  <CCol md={4}>
                    <label>
                      Title<span style={{ color: "red" }}>*</span>
                    </label>
                    <CFormInput
                      type="text"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                    {titleError && (
                      <CFormFeedback
                        className="small text-danger"
                        style={{ marginBottom: "10px" }}
                      >
                        {titleError}
                      </CFormFeedback>
                    )}
                  </CCol>
                  <CCol md={4}>
                    <label>
                      From Email<span style={{ color: "red" }}>*</span>
                    </label>
                    <CFormInput
                      type="text"
                      placeholder="email"
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
                  <CCol md={4}>
                    <label>
                      From Name<span style={{ color: "red" }}>*</span>
                    </label>
                    <CFormInput
                      type="text"
                      placeholder="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
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

                  <CCol md={4}>
                    <div style={{ marginTop: "35px", marginLeft: "20px" }}>
                      <CFormCheck
                        type="checkbox"
                        id="isManualMail"
                        label={<span>is Manual Mail</span>}
                        checked={isManualMail}
                        onChange={handleManualMailChange}
                      />
                    </div>
                  </CCol>

                  <CCol md={4}>
                    <div style={{ marginTop: "35px" }}>
                      <CFormCheck
                        type="checkbox"
                        id="isContactUsMail"
                        label="is Contact Us Mail"
                        checked={isContactUsMail}
                        onChange={handleContactUsMailChange}
                      />
                    </div>
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
                    <label>
                      Subject<span style={{ color: "red" }}>*</span>
                    </label>
                    <CFormInput
                      type="text"
                      placeholder="Subject"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                    />
                    {subjectError && (
                      <CFormFeedback
                        className="small text-danger"
                        style={{ marginBottom: "10px" }}
                      >
                        {subjectError}
                      </CFormFeedback>
                    )}
                  </CCol>

                  <CCol xs={12}>
                    <label>
                      Body<span style={{ color: "red" }}>*</span>
                    </label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={editorData}
                      onChange={handleEditorChange}
                    />
                    {bodyError && (
                      <CFormFeedback
                        className="small text-danger"
                        style={{ marginBottom: "10px" }}
                      >
                        {bodyError}
                      </CFormFeedback>
                    )}
                  </CCol>
                  <CCol md={6}>
                    <CButton type="submit">
                      {" "}
                      {id ? "Save Changes" : "Add EmailTemplate"}
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
  );
};

export default EmailTemplateSave;
