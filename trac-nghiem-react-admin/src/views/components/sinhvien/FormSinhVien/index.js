import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormFeedback, CFormInput, CFormLabel } from '@coreui/react';
import React from 'react'
import _chuanHoaChuoi from 'src/_chuanHoaChuoi.js';

export default function index(props) {
  const {
    handleSubmit,
    validated,
    cardHeader,
    btnTitle,
    isEdit,
    masv, setMasv,
    ho, setHo,
    ten, setTen,
    diachi, setDiaChi,
    email, setEmail,
    ngaysinh, setNgaySinh
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
            <CCol md={3}>
              <div className="mb-3">
                <CFormLabel>Mã sinh viên</CFormLabel>
                <CFormInput
                  type="text"
                  required
                  placeholder="Nhập mã sinh viên..."
                  value={masv}
                  onChange={(e) => setMasv(e.target.value)}
                  onBlur={(e) => setMasv(_chuanHoaChuoi(e.target.value))}
                />
                <CFormFeedback invalid>Vui lòng nhập mã sinh viên!</CFormFeedback>
              </div>
            </CCol>

            <CCol md={4}>
              <div className="mb-3">
                <CFormLabel>Họ</CFormLabel>
                <CFormInput
                  type="text"
                  required
                  placeholder="Nhập họ sinh viên..."
                  value={ho}
                  onChange={(e) => setHo(e.target.value)}
                  onBlur={(e) => setHo(_chuanHoaChuoi(e.target.value))}
                />
                <CFormFeedback invalid>Vui lòng nhập họ sinh viên!</CFormFeedback>
              </div>
            </CCol>

            <CCol md={5}>
              <div className="mb-3">
                <CFormLabel>Tên</CFormLabel>
                <CFormInput
                  type="text"
                  required
                  placeholder="Nhập tên sinh viên..."
                  value={ten}
                  onChange={(e) => setTen(e.target.value)}
                  onBlur={(e) => setTen(_chuanHoaChuoi(e.target.value))}
                />
                <CFormFeedback invalid>Vui lòng nhập tên sinh viên!</CFormFeedback>
              </div>
            </CCol>

            <CCol md={12}>
              <div className="mb-3">
                <CFormLabel>Địa chỉ</CFormLabel>
                <CFormInput
                  type="text"
                  required
                  placeholder="Nhập địa chỉ..."
                  value={diachi}
                  onChange={(e) => setDiaChi(e.target.value)}
                  onBlur={(e) => setDiaChi(_chuanHoaChuoi(e.target.value))}
                />
                <CFormFeedback invalid>Vui lòng nhập địa chỉ!</CFormFeedback>
              </div>
            </CCol>

            <CCol md={6}>
              <div className="mb-3">
                <CFormLabel>Email</CFormLabel>
                <CFormInput
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={(e) => setEmail(_chuanHoaChuoi(e.target.value))}
                  disabled={isEdit}
                />
                <CFormFeedback invalid>Vui lòng nhập Email hợp lệ!</CFormFeedback>
              </div>
            </CCol>

            <CCol md={6}>
              <div className="mb-3">
                <CFormLabel>Ngày sinh</CFormLabel>
                <CFormInput
                  type="date"
                  max="2003-12-31"
                  required
                  value={ngaysinh}
                  onChange={(e) => setNgaySinh(e.target.value)}
                />
                <CFormFeedback invalid>Vui lòng nhập ngày sinh hợp lệ!</CFormFeedback>
              </div>
            </CCol>

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
