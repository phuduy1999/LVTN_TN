import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import khoaApi from 'src/api/khoaApi';
import nhomQuyenApi from 'src/api/nhomQuyenApi';
import _chuanHoaChuoi from 'src/_chuanHoaChuoi.js';

export default function index(props) {
  const {
    handleSubmit,
    validated,
    cardHeader,
    btnTitle,
    isEdit,
    makh, setMakh,
    manq, setManq,
    magv, setMagv,
    ho, setHo,
    ten, setTen,
    diachi, setDiaChi,
    email, setEmail,
    sdt, setSDT
  } = props;

  const [dskh, setDSKH] = useState([]);
  const [dsnq, setDSNQ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchKhoa = khoaApi.getAll();
      const fetchNQ = nhomQuyenApi.getAll();
      try {
        const result = await Promise.all([fetchKhoa, fetchNQ]);
        setDSKH(result[0]);
        setMakh(result[0][0].MAKH);
        setDSNQ(result[1]);
        setManq(result[1][0].MANQ);
        console.log(result);
      }
      catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])

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
                <CFormLabel>Mã giáo viên</CFormLabel>
                <CFormInput
                  type="text"
                  required
                  placeholder="Nhập mã giáo viên..."
                  value={magv}
                  onChange={(e) => setMagv(e.target.value)}
                  onBlur={(e) => setMagv(_chuanHoaChuoi(e.target.value))}
                  disabled={isEdit}
                />
                <CFormFeedback invalid>Vui lòng nhập mã giáo viên!</CFormFeedback>
              </div>
            </CCol>

            <CCol md={4}>
              <div className="mb-3">
                <CFormLabel>Họ</CFormLabel>
                <CFormInput
                  type="text"
                  required
                  placeholder="Nhập họ giáo viên..."
                  value={ho}
                  onChange={(e) => setHo(e.target.value)}
                  onBlur={(e) => setHo(_chuanHoaChuoi(e.target.value))}
                />
                <CFormFeedback invalid>Vui lòng nhập họ giáo viên!</CFormFeedback>
              </div>
            </CCol>

            <CCol md={5}>
              <div className="mb-3">
                <CFormLabel>Tên</CFormLabel>
                <CFormInput
                  type="text"
                  required
                  placeholder="Nhập tên giáo viên..."
                  value={ten}
                  onChange={(e) => setTen(e.target.value)}
                  onBlur={(e) => setTen(_chuanHoaChuoi(e.target.value))}
                />
                <CFormFeedback invalid>Vui lòng nhập tên giáo viên!</CFormFeedback>
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
                <CFormLabel>Số điện thoại</CFormLabel>
                <CFormInput
                  type="tel"
                  required
                  placeholder="Nhập số điện thoại..."
                  value={sdt}
                  onChange={(e) => setSDT(e.target.value)}
                  onBlur={(e) => setSDT(_chuanHoaChuoi(e.target.value))}
                />
                <CFormFeedback invalid>Vui lòng nhập số điện thoại hợp lệ!</CFormFeedback>
              </div>
            </CCol>

            <CCol md={6}>
              <div className="mb-3">
                <CFormLabel>Khoa</CFormLabel>
                <CFormSelect className="mb-3"
                  value={makh}
                  onChange={(e) => setMakh(e.target.value)}>
                  <option disabled>Chọn khoa...</option>
                  {dskh && (dskh.map((kh) => (
                    <option value={kh.MAKH} key={kh.MAKH}>{kh.TENKH}</option>
                  )))}
                </CFormSelect>
              </div>
            </CCol>

            <CCol md={6}>
              <div className="mb-3">
                <CFormLabel>Nhóm quyền</CFormLabel>
                <CFormSelect className="mb-3"
                  value={manq}
                  onChange={(e) => setManq(e.target.value)}
                  disabled={isEdit}
                >
                  <option disabled>Chọn nhóm quyền...</option>
                  {dsnq && (dsnq.map((nq) => (
                    <option value={nq.MANQ} key={nq.MANQ}>
                      {nq.TENQUYEN}
                    </option>
                  )
                  ))}
                </CFormSelect>
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
