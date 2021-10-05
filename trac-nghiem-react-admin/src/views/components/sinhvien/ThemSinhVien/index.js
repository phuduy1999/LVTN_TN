import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormFeedback, CFormInput, CFormLabel } from '@coreui/react';
import React, { useState } from 'react';
import sinhVienApi from 'src/api/sinhVienApi';
import AppModalCustom from 'src/components/AppModalCustom';

export default function index() {
  const [masv, setMasv] = useState('');
  const [ten, setTen] = useState('');
  const [ho, setHo] = useState('');
  const [diachi, setDiaChi] = useState('');
  const [email, setEmail] = useState('');
  const [ngaysinh, setNgaySinh] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [visible, setVisible] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [mess, setMess] = useState(false)
  const pageRedirect = '/sinhvien/ds-sinhvien';

  const [validated, setValidated] = useState(false)
  const handleSubmit = event => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    else {
      setIsPending(true);

      sinhVienApi.addOne({
        MASV: masv,
        HO: ho,
        TEN: ten,
        DIACHI: diachi,
        EMAIL: email,
        NGAYSINH: ngaysinh
      })
        .then(function (response) {
          console.log(response);

          setIsPending(false);
          setVisible(!visible);
          setIsSuccess(true);
          setMess('Thêm sinh viên thành công!')
        })
        .catch(function (error) {
          console.log(error.response);
          setIsPending(false);
          setVisible(!visible);
          setMess('Lỗi: ' + error.response.data.err)
        });
    }
    setValidated(true)
  }

  const handleSetVisible = () => {
    setVisible(false);
  }

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Thêm mới sinh viên</strong>
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
                  value={masv}
                  onChange={(e) => setMasv(e.target.value)}
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
                  value={ho}
                  onChange={(e) => setHo(e.target.value)}
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
                  value={ten}
                  onChange={(e) => setTen(e.target.value)}
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
                  value={diachi}
                  onChange={(e) => setDiaChi(e.target.value)}
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
              {!isPending && <CButton color="primary" type="submit">
                Thêm
              </CButton>}
              {isPending && <CButton disabled color="primary">
                Thêm...
              </CButton>}
            </CCol>
            <AppModalCustom visible={visible} handleSetVisible={handleSetVisible}
              mess={mess} isSuccess={isSuccess} pageRedirect={pageRedirect} />
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  )
}
