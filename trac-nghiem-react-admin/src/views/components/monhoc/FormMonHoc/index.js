import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormFeedback, CFormInput, CFormLabel } from '@coreui/react';
import React from 'react'
import _chuanHoaChuoi from 'src/_chuanHoaChuoi.js';

export default function index(props) {
  const {
    handleSubmit,
    validated,
    cardHeader,
    btnTitle,
    mamh, setMamh,
    tenmh, setTenmh
  } = props;

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>{cardHeader}</strong>
        </CCardHeader>
        <CCardBody>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <CFormLabel>Mã môn học</CFormLabel>
              <CFormInput
                type="text"
                required
                placeholder="Nhập mã môn học..."
                value={mamh}
                onChange={(e) => setMamh(e.target.value)}
                onBlur={(e) => setMamh(_chuanHoaChuoi(e.target.value))}
              />
              <CFormFeedback invalid>Vui lòng nhập mã môn học!</CFormFeedback>
            </div>
            <div className="mb-3">
              <CFormLabel>Tên môn học</CFormLabel>
              <CFormInput
                type="text"
                required
                placeholder="Nhập tên môn học..."
                value={tenmh}
                onChange={(e) => setTenmh(e.target.value)}
                onBlur={(e) => setTenmh(_chuanHoaChuoi(e.target.value))}
              />
              <CFormFeedback invalid>Vui lòng nhập tên môn học!</CFormFeedback>
            </div>
            <CCol xs={12}>
              <CButton color="primary" type="submit">
                {btnTitle}
              </CButton>
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  )
}
