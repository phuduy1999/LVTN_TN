import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import giaoVienApi from 'src/api/giaoVienApi';
import khoaApi from 'src/api/khoaApi';
import monHocApi from 'src/api/monHocApi';
import _chuanHoaChuoi from 'src/_chuanHoaChuoi.js';

export default function index(props) {
  const {
    handleSubmit,
    validated,
    isEdit,
    cardHeader,
    btnTitle,
    makh, setMakh,
    mamh, setMamh,
    magv, setMagv,
    nienkhoa, setNienKhoa,
    hocky, setHocKy,
    nhom, setNhom,
    sosvtt, setSOVTT,
  } = props;

  const [dskh, setDSKH] = useState([]);
  const [dsmh, setDSMH] = useState([]);
  const [dsgv, setDSGV] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchKhoa = khoaApi.getAll();
      const fetchMH = monHocApi.getAll();
      const fetchGV = giaoVienApi.getAll();
      try {
        const result = await Promise.all([fetchKhoa, fetchMH, fetchGV]);
        setDSKH(result[0]);
        setDSMH(result[1]);
        setDSGV(result[2]);
        if (isEdit === false) {
          setMakh(result[0][0].MAKH);
          setMamh(result[1][0].MAMH);
          setMagv(result[2][0].MAGV);
        }
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
            <CCol md={6}>
              <div className="mb-3">
                <CFormLabel>Niên khóa</CFormLabel>
                <CFormInput
                  type="text"
                  required
                  placeholder="Vd: 2020-2021"
                  value={nienkhoa}
                  onChange={(e) => setNienKhoa(e.target.value)}
                  onBlur={(e) => setNienKhoa(_chuanHoaChuoi(e.target.value))}
                />
                <CFormFeedback invalid>Vui lòng nhập niên khóa hợp lệ!</CFormFeedback>
              </div>
            </CCol>

            <CCol md={6}>
              <div className="mb-3">
                <CFormLabel>Học kỳ</CFormLabel>
                <CFormSelect className="mb-3"
                  value={hocky}
                  onChange={(e) => setHocKy(e.target.value)}>
                  <option disabled>Chọn học kỳ...</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </CFormSelect>
              </div>
            </CCol>

            <CCol md={6}>
              <div className="mb-3">
                <CFormLabel>Nhóm</CFormLabel>
                <CFormInput
                  type="number"
                  required
                  placeholder="Nhập nhóm..."
                  min="1"
                  value={nhom}
                  onChange={(e) => setNhom(e.target.value)}
                />
                <CFormFeedback invalid>Vui lòng nhập nhóm hợp lệ!</CFormFeedback>
              </div>
            </CCol>

            <CCol md={6}>
              <div className="mb-3">
                <CFormLabel>Số sinh viên tối thiểu</CFormLabel>
                <CFormInput
                  type="number"
                  required
                  placeholder="Nhập số sinh viên tối thiểu..."
                  min="1"
                  value={sosvtt}
                  onChange={(e) => setSOVTT(e.target.value)}
                />
                <CFormFeedback invalid>Vui lòng nhập số sinh viên tối thiểu hợp lệ!</CFormFeedback>
              </div>
            </CCol>

            <CCol md={4}>
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

            <CCol md={4}>
              <div className="mb-3">
                <CFormLabel>Môn học</CFormLabel>
                <CFormSelect className="mb-3"
                  value={mamh}
                  onChange={(e) => setMamh(e.target.value)}>
                  <option disabled>Chọn môn học...</option>
                  {dsmh && (dsmh.map((mh) => (
                    <option value={mh.MAMH} key={mh.MAMH}>{mh.TENMH}</option>
                  )))}
                </CFormSelect>
              </div>
            </CCol>

            <CCol md={4}>
              <div className="mb-3">
                <CFormLabel>Giáo viên</CFormLabel>
                <CFormSelect className="mb-3"
                  value={magv}
                  onChange={(e) => setMagv(e.target.value)}>
                  <option disabled>Chọn giáo viên...</option>
                  {dsgv && (dsgv.map((gv) => (
                    <option value={gv.MAGV} key={gv.MAGV}>{gv.HO + " " + gv.TEN}</option>
                  )))}
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
