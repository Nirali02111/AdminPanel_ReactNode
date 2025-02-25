import { ChangeEvent, useEffect, useState } from "react";
import {
  IProfile,
  getProfile,
  updateProfile,
} from "../../services/account.service";
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CHeader,
  CRow,
  CFormFeedback,
} from "@coreui/react";
import { AppBreadcrumb } from "../../components";
import AppImage from "../../components/AppImage";
import { Link } from "react-router-dom";
import AppAlert from "../../components/AppAlert";
import useAlert from "../../hooks/useAlert";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
const Profile = () => {
  const [profile, setProfile] = useState<IProfile>({
    firstName: "",
    lastName: "",
    email: "",
    profileImage: "",
  });
  const [image, setImage] = useState<File | null>(null);
  const { message, logMessage, type } = useAlert();
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchProfileData();
  }, []);
  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const res = await getProfile();
      setProfile(res.data.data);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

    const { name, value } = e.target;
    if (e.target.type === "file") {
      if (e.target.files?.length) {
        const imageFile = e.target.files[0];
        setImage(imageFile);

        setProfile({
          ...profile,
          profileImage: URL.createObjectURL(imageFile),
        });
      }
    } else {
      if (name === "firstName") {
        setFirstNameError("");
      }
      if (name === "lastName") {
        setLastNameError("");
      }
      setProfile({ ...profile, [name]: value });
    }
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const firstName = profile.firstName.trim();
    const lastName = profile.lastName.trim();
    if (!firstName) {
      setProfile({ ...profile, firstName: "" });
      setFirstNameError("First Name is required");
    }
    if (!lastName) {
      setProfile({ ...profile, lastName: "" });
      setLastNameError("Last Name is required");
    }
    if (!firstName || !lastName) {
      return;
    }
    setFirstNameError("");
    setLastNameError("");
    const formData = new FormData();
    formData.append("firstName", profile.firstName.trim());
    formData.append("lastName", profile.lastName.trim());

    if (image) {

      formData.append("profileImage", image);
    }
    try {
      const res = await updateProfile(formData);
      logMessage(res.data.message);
    } catch (e: any) { }
  };

  return (
    <div>
      <CHeader className="mb-4">
        <CContainer fluid>
          <div>
            <CRow>
              <CCol>
                <h3>Profile</h3>
              </CCol>
            </CRow>
          </div>
        </CContainer>
        <CContainer fluid>
          <AppBreadcrumb />
        </CContainer>
      </CHeader>
      <div className="body flex-grow-1 px-3">
        <CCard className="mb-4">
          <CCardBody>
            <AppAlert message={message} type={type} />
            {loading ? (
              <SpinnerLoader />
            ) : (

              <CForm onSubmit={handleSubmit} className="row g-3" noValidate>
                <CRow className="g-3">
                  <CCol md={4}>
                    <label>First Name<span style={{ color: "red" }}>*</span>
                    </label>
                    <CFormInput
                      name="firstName"
                      required
                      onChange={handleChange}
                      value={profile.firstName}
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
                    <label>Last Name<span style={{ color: "red" }}>*</span>
                    </label>
                    <CFormInput
                      name="lastName"
                      required
                      onChange={handleChange}
                      value={profile.lastName}
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
                    <label>Email<span style={{ color: "red" }}>*</span>
                    </label>
                    <CFormInput
                      name="email"
                      readOnly
                      required
                      onChange={handleChange}
                      value={profile.email}
                    />
                  </CCol>
                  <CCol md={4}>
                    <label>Profile Image<span style={{ color: "red" }}>*</span>
                    </label>
                    <CFormInput
                      name="profileImage"
                      onChange={handleChange}
                      type="file"
                      accept=".png,.jpg,.jpeg,.gif,.tif"
                    />
                  </CCol>
                  <CCol md={4}>
                    <AppImage
                      src={profile?.profileImage as string}
                      alt="profile"
                      height={100}
                      width={100}
                    />
                  </CCol>
                </CRow>

                <div>
                  <CButton type="submit" className="me-2">
                    Submit
                  </CButton>
                  <Link className="btn btn-secondary" to="/dashboard">
                    Cancel
                  </Link>
                </div>
              </CForm>
            )}
          </CCardBody>
        </CCard>
      </div>
    </div>
  );
};

export default Profile;
