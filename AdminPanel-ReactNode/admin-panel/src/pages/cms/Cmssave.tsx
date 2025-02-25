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
import { AppBreadcrumb } from "../../components";
import useAlert from "../../hooks/useAlert";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useNavigate, useParams } from "react-router";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import { addCMSAPI, editCMSAPI, getCMSbyId } from "../../services/cmsService";
import { UserContext } from "../../context/UserContext";
const Cmssave = () => {
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState("");
  const [title, setTitle] = useState("");
  const [metatitle, setMettitle] = useState("");
  const [metakeyword, setMetakeyword] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [status, setStatus] = useState("Active");
  const [content, setContent] = useState("");
  const [editorData, setEditorData] = useState("");
  const [keyError, setKeyError] = useState("");
  const [titleError, setTitleError] = useState("");
  const [metatitleError, setMetatitleError] = useState("");
  const [metakeywordError, setMetakeywordError] = useState("");
  const [metaDescriptionError, setMetaDescriptionError] = useState("");
  const [editorDataError, setEditorDataError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { logMessage } = useAlert();
  const { id } = useParams();
  const { setAlertMessage } = useContext(UserContext);
  const navigate = useNavigate();
  const handleEditorChange = (event: any, editor: any) => {
    const data = editor.getData();
    setEditorData(data);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formIsValid = true;
    if (errorMessage) {
      setErrorMessage("");
    }
    if (!key) {
      setKeyError("key is required");
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
    if (!metatitle) {
      setMetatitleError("Meta Ttile is required");
      formIsValid = false;
    } else {
      setMetatitleError("");
    }
    if (!metakeyword) {
      setMetakeywordError("Meta Keyword is required");
      formIsValid = false;
    } else {
      setMetakeywordError("");
    }

    if (!metaDescription) {
      setMetaDescriptionError("Meta Description is required");
      formIsValid = false;
    } else {
      setMetaDescriptionError("");
    }
    if (!editorData) {
      setEditorDataError("Content is required");
      formIsValid = false;
    } else {
      setEditorDataError("");
    }
    const formData = {
      key: key,
      title: title,
      metaTitle: metatitle,
      metaKeyword: metakeyword,
      metaDescription: metaDescription,
      content: editorData,
      status: status,
    };
    if (formIsValid) {
      try {
        let response;
        if (id) {
          response = await editCMSAPI(formData, id);
        } else {
          response = await addCMSAPI(formData);
        }

        if (response.status === 200) {
          setKey("");
          setTitle("");
          setMettitle("");
          setMetakeyword("");
          setMetaDescription("");
          setStatus("");
          setContent("");
          setAlertMessage(response.data.message);
          navigate("/cmsmanagement");
        } else {
        }
        logMessage(response.data.message);
      } catch (error: any) {
        setErrorMessage(error.response.data.message);
      }
    }
  };
  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value.trim());
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (id) {
          const response = await getCMSbyId(id);

          const data = response.data.data; // Assuming the response contains JSON data

          setKey(data.key);
          setTitle(data.title);
          setMettitle(data.metaTitle);
          setEditorData(data.content);
          setMetakeyword(data.metaKeyword);
          setStatus(data.status);
          setMetaDescription(data.metaDescription);
        }
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleFormCancel = () => {
    navigate("/cmsmanagement");
  };
  return (
    <div>
      <CHeader className="mb-4">
        <CContainer fluid>
          <div>
            <CRow>
              <CCol>
                <h3>CMS</h3>
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
                        readOnly // Make the input read-only when editing
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
                      Meta Title<span style={{ color: "red" }}>*</span>
                    </label>
                    <CFormInput
                      type="text"
                      placeholder="metatitle"
                      value={metatitle}
                      onChange={(e) => setMettitle(e.target.value)}
                    />
                    {metatitleError && (
                      <CFormFeedback
                        className="small text-danger"
                        style={{ marginBottom: "10px" }}
                      >
                        {metatitleError}
                      </CFormFeedback>
                    )}
                  </CCol>
                  <CCol md={4}>
                    <label>
                      Meta Keyword<span style={{ color: "red" }}>*</span>
                    </label>
                    <CFormInput
                      type="text"
                      placeholder="metakeyword"
                      value={metakeyword}
                      onChange={(e) => setMetakeyword(e.target.value)}
                    />
                    {metakeywordError && (
                      <CFormFeedback
                        className="small text-danger"
                        style={{ marginBottom: "10px" }}
                      >
                        {metakeywordError}
                      </CFormFeedback>
                    )}
                  </CCol>

                  <CCol md={4}>
                    <label>
                      Meta Description<span style={{ color: "red" }}>*</span>
                    </label>
                    <CFormInput
                      type="text"
                      placeholder="Metadescription"
                      value={metaDescription}
                      onChange={(e) => setMetaDescription(e.target.value)}
                    />
                    {metaDescriptionError && (
                      <CFormFeedback
                        className="small text-danger"
                        style={{ marginBottom: "10px" }}
                      >
                        {metaDescriptionError}
                      </CFormFeedback>
                    )}
                  </CCol>
                  <CCol md={4}>
                    <label>Status</label>
                    <CFormSelect value={status} onChange={handleStatusChange}>
                      <option value="active">Active</option>
                      <option value="InActive">InActive</option>
                    </CFormSelect>
                  </CCol>

                  <CCol xs={12}>
                    <label>
                      Content<span style={{ color: "red" }}>*</span>
                    </label>
                    <CKEditor
                      editor={ClassicEditor}
                      data={editorData}
                      onChange={handleEditorChange}
                    />
                    {editorDataError && (
                      <CFormFeedback
                        className="small text-danger"
                        style={{ marginBottom: "10px" }}
                      >
                        {editorDataError}
                      </CFormFeedback>
                    )}
                  </CCol>
                  <CCol xs={12}>
                    <CButton type="submit">
                      {" "}
                      {id ? "Save Changes" : "Add CMS"}
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

export default Cmssave;
