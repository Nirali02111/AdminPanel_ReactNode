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
import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { AppBreadcrumb } from "../../components";
import { useNavigate, useParams } from "react-router";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import useAlert from "../../hooks/useAlert";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import { addFaqAPI, editFaqAPI, getFaqbyId } from "../../services/faqService";
import { UserContext } from "../../context/UserContext";

const FAQSave = () => {
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [questionError, setQuestionError] = useState("");
  const [answer, setAnswer] = useState("");
  const [answerError, setAnswerError] = useState("");
  const [displayOrder, setDisplayOrder] = useState("");
  const [displayOrderError, setDisplayOrderError] = useState("");
  const [status, setStatus] = useState("Active");
  const [editorData, setEditorData] = useState("");
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
    if (!question) {
      setQuestionError("Question is required.");
      formIsValid = false;
    } else {
      setQuestionError("");
    }
    if (!displayOrder) {
      setDisplayOrderError("Display Order is required.");
      formIsValid = false;
    } else {
      setDisplayOrderError("");
    }
    if (!editorData) {
      setAnswerError("Answer is required.");
      formIsValid = false;
    } else {
      setAnswerError("");
    }

    const formData = {
      question,
      ...{ answer: editorData },
      displayOrder,
      status,
    };
    if (formIsValid) {
      try {
        let response;
        if (id) {
          response = await editFaqAPI(formData, id);
        } else {
          response = await addFaqAPI(formData);
        }

        if (response.status === 200) {
          setQuestion("");
          setAnswer("");
          setDisplayOrder("");
          setStatus("");
          setAlertMessage(response.data.message);
          navigate(`/faq`);
        } else {
        }
        logMessage(response.data.message);
      } catch (error: any) {
        setDisplayOrderError(error.response.data.message);
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (id) {
          const response = await getFaqbyId(id);
          const data = response.data.data;

          setEditorData(data.answer);
          setQuestion(data.question);
          setDisplayOrder(data.displayOrder);
          setStatus(data.status);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  const handleStatusChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setStatus(e.target.value);
  };

  const handleFormCancel = () => {
    navigate("/faq");
  };
  return (
    <div>
      <CHeader className="mb-4">
        <CContainer fluid>
          <div>
            <CRow>
              <CCol>
                <h3>FAQ</h3>
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
                    <CCol xs={12}>
                      <label>
                        Question<span style={{ color: "red" }}>*</span>
                      </label>
                      <CFormInput
                        type="text"
                        placeholder="Question"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                      />
                      {questionError && (
                        <CFormFeedback
                          className="small text-danger"
                          style={{ marginBottom: "10px" }}
                        >
                          {questionError}
                        </CFormFeedback>
                      )}
                    </CCol>
                    <CCol xs={12}>
                      <label>
                        Answer<span style={{ color: "red" }}>*</span>
                      </label>
                      <CKEditor
                        editor={ClassicEditor}
                        data={editorData}
                        onChange={handleEditorChange}
                      />
                      {answerError && (
                        <CFormFeedback
                          className="small text-danger"
                          style={{ marginBottom: "10px" }}
                        >
                          {answerError}
                        </CFormFeedback>
                      )}
                    </CCol>
                    <CCol md={6}>
                      <label>
                        Display Order<span style={{ color: "red" }}>*</span>
                      </label>
                      <CFormInput
                        type="number"
                        placeholder="Display Order"
                        value={displayOrder}
                        onChange={(e) => {
                          const parsedValue = parseInt(e.target.value, 10);

                          if (!isNaN(parsedValue) && parsedValue >= 0) {
                            setDisplayOrder(parsedValue.toString());
                          }
                        }}
                      />
                      {displayOrderError && (
                        <CFormFeedback
                          className="small text-danger"
                          style={{ marginBottom: "10px" }}
                        >
                          {displayOrderError}
                        </CFormFeedback>
                      )}
                    </CCol>
                    <CCol md={6}>
                      <label>Status</label>
                      <CFormSelect value={status} onChange={handleStatusChange}>
                        <option value="Active">Active</option>
                        <option value="InActive">InActive</option>
                      </CFormSelect>
                    </CCol>

                    <div></div>
                    <CCol xs={12}>
                      <CButton color="primary" type="submit" className="px-4">
                        {id ? "Save Changes" : "Add FAQ"}
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
    </div>
  );
};

export default FAQSave;
