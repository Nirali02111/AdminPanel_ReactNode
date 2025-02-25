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
import React, { useContext, useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { AppBreadcrumb } from "../../components";
import useAlert from "../../hooks/useAlert";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import {
  addApplicationConfigurationAPI,
  editApplicationConfigurationAPI,
  getApplicationConfigurationbyId,
} from "../../services/applicationConfigurationService";
import { UserContext } from "../../context/UserContext";
const ApplicationConfigurationSave = () => {
  const [loading, setLoading] = useState(true);
  const [key, setKey] = useState("");
  const [keyerror, setKeyerror] = useState("");
  const [value, setValue] = useState("");
  const [valueerror, setValueerror] = useState("");
  const { id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { logMessage } = useAlert();
  const { setAlertMessage } = useContext(UserContext);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let formIsValid = true;
    if (!key) {
      setKeyerror("Key is required");
      formIsValid = false;
    } else {
      setKeyerror("");
    }
    if (!value) {
      setValueerror("Value is required");
      formIsValid = false;
    } else {
      setValueerror("");
    }

    const formData = { key: key, value: value };

    if (formIsValid) {
      try {
        let response;
        if (id) {
          response = await editApplicationConfigurationAPI(formData, id);
        } else {
          response = await addApplicationConfigurationAPI(formData);
        }

        if (response.status === 200) {
          // Reset fields
          setKey("");
          setValue("");
          setAlertMessage(response.data.message);
          navigate("/applicationConfiguration");
        } else {
        }
        logMessage(response.data.message);
      } catch (error: any) {
        setErrorMessage(error.response.data.message);
      }
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        if (id) {
          const response = await getApplicationConfigurationbyId(id);

          const data = response.data.data;
          setKey(data.key);
          setValue(data.value);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  const handleFormCancel = () => {
    navigate("/applicationconfiguration");
  };
  return (
    <div>
      <CHeader className="mb-4">
        <CContainer fluid>
          <div>
            <CRow>
              <CCol>
                <h3>Application Configuration</h3>
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
                  <CCol md={6}>
                    {errorMessage && (
                      <CFormFeedback
                        className="small text-danger"
                        style={{ marginBottom: "10px" }}
                      >
                        {errorMessage}
                      </CFormFeedback>
                    )}
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
                    {keyerror && (
                      <CFormFeedback
                        className="small text-danger"
                        style={{ marginBottom: "10px" }}
                      >
                        {keyerror}
                      </CFormFeedback>
                    )}
                  </CCol>

                  <CCol md={6}>
                    <label>
                      Value<span style={{ color: "red" }}>*</span>
                    </label>
                    <CFormInput
                      type="text"
                      placeholder="Value"
                      value={value}
                      onChange={(e) => setValue(e.target.value)}
                    />
                    {valueerror && (
                      <CFormFeedback
                        className="small text-danger"
                        style={{ marginBottom: "10px" }}
                      >
                        {valueerror}
                      </CFormFeedback>
                    )}
                  </CCol>

                  <CCol xs={12}>
                    <CButton type="submit">
                      {" "}
                      {id ? "Save Changes" : "Add Configuration"}
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

export default ApplicationConfigurationSave;
