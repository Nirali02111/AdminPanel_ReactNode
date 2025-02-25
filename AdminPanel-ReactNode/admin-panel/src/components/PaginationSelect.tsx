import React from 'react'
import { CCol, CFormSelect, CForm } from '@coreui/react';

interface PaginationSelectProps {
    onChange: (value: number) => void;
    value: number;
    size?: string;
}

const PaginationSelect: React.FC<PaginationSelectProps> = ({ onChange, value, size = '200px' }) => {
    return (
        <>

            <CForm className="row g-3 mb-4" style={{ width: "350px" }}>
                <CCol md={2} >Show</CCol>
                <CCol md={7}>
                    <CFormSelect onChange={(e) => onChange(parseInt(e.target.value))} value={value} style={{ width: size }} size="sm">
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="15">15</option>
                    </CFormSelect>
                </CCol>
                <CCol md={3}>
                    <span>entries</span>
                </CCol>

            </CForm>
        </>
    )
}

export default PaginationSelect
