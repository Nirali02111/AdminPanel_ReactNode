import {
    CCol,
    CContainer,
    CRow,
} from '@coreui/react'
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'
const Forbidden = () => {
    const location = useLocation();
    useEffect(() => {
        document.title = 'Forbidden-Admin Panel';
    }, [location]);
    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={6}>
                        <div className="clearfix">
                            {/* <h1 className="float-start display-3 me-4">403</h1> */}
                            <h4 className="pt-3">FORBIDDEN</h4>
                            <p className="text-medium-emphasis float-start">
                                You do not have access to this resource.
                            </p>
                        </div>
                        <Link to="/dashboard">Goto Dashboard</Link>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Forbidden

