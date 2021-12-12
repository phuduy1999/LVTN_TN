import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormFeedback, CFormInput, CFormLabel } from '@coreui/react';
import React from 'react';
import _chuanHoaChuoi from 'src/_chuanHoaChuoi.js';

export default function index(props) {
  const {
    handleSubmit,
    validated,
    cardHeader,
    btnTitle,
    makh, setMakh,
    tenkh, setTenkh
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
            onSubmit={(e) => handleSubmit(e)}
          >
            <div className="mb-3">
              <CFormLabel>Mã khoa</CFormLabel>
              <CFormInput
                type="text"
                required
                placeholder="Nhập mã khoa..."
                value={makh}
                onChange={(e) => setMakh(_chuanHoaChuoi(e.target.value).toUpperCase())}
              />
              <CFormFeedback invalid>Vui lòng nhập mã khoa!</CFormFeedback>
            </div>
            <div className="mb-3">
              <CFormLabel>Tên khoa</CFormLabel>
              <CFormInput
                type="text"
                required
                placeholder="Nhập tên khoa..."
                value={tenkh}
                onChange={(e) => setTenkh(e.target.value)}
                onBlur={(e) => setTenkh(_chuanHoaChuoi(e.target.value))}
              />
              <CFormFeedback invalid>Vui lòng nhập tên khoa!</CFormFeedback>
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
