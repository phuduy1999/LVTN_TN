import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import monHocApi from 'src/api/monHocApi';
import _chuanHoaChuoi from 'src/_chuanHoaChuoi.js';

export default function index(props) {
  const {
    handleSubmit,
    validated,
    cardHeader,
    btnTitle,
    isEdit,
    trinhdo, setTrinhDo,
    nienkhoa, setNienKhoa,
    hocky, setHocKy,
    nhom, setNhom,
    ngaythi, setNgayThi,
    mamh, setMamh,
    sct, setSCT,
    tg, setTG,
  } = props;

  const [dsmh, setDSMH] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await monHocApi.getAll();
        setDSMH(response);
        setMamh(response[0].MAMH);
        console.log(response);
      } catch (error) {
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
            <h5>Thông tin lớp môn học</h5>
            <CCol md={3}>
              <div className="mb-3">
                <CFormLabel>Niên khóa</CFormLabel>
                <CFormInput
                  type="text"
                  required
                  placeholder="Vd: 2020-2021"
                  disabled={isEdit}
                  value={nienkhoa}
                  onChange={(e) => setNienKhoa(_chuanHoaChuoi(e.target.value))}
                />
                <CFormFeedback invalid>Vui lòng nhập niên khóa hợp lệ!</CFormFeedback>
              </div>
            </CCol>

            <CCol md={3}>
              <div className="mb-3">
                <CFormLabel>Học kỳ</CFormLabel>
                <CFormSelect className="mb-3"
                  value={hocky}
                  disabled={isEdit}
                  onChange={(e) => setHocKy(e.target.value)}>
                  <option disabled>Chọn học kỳ...</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                </CFormSelect>
              </div>
            </CCol>

            <CCol md={3}>
              <div className="mb-3">
                <CFormLabel>Nhóm</CFormLabel>
                <CFormInput
                  type="number"
                  required
                  placeholder="Nhập nhóm..."
                  disabled={isEdit}
                  min="1"
                  value={nhom}
                  onChange={(e) => setNhom(e.target.value)}
                />
                <CFormFeedback invalid>Vui lòng nhập nhóm hợp lệ!</CFormFeedback>
              </div>
            </CCol>

            <CCol md={3}>
              <div className="mb-3">
                <CFormLabel>Môn học</CFormLabel>
                <CFormSelect className="mb-3"
                  value={mamh}
                  disabled={isEdit}
                  onChange={(e) => setMamh(e.target.value)}>
                  <option disabled>Chọn môn học...</option>
                  {dsmh && (dsmh.map((mh) => (
                    <option value={mh.MAMH} key={mh.MAMH}>{mh.TENMH}</option>
                  )))}
                </CFormSelect>
              </div>
            </CCol>

            <h5>Thông tin đăng ký thi</h5>

            <CCol md={6}>
              <div className="mb-3">
                <CFormLabel>Trình độ thi</CFormLabel>
                <CFormSelect className="mb-3"
                  value={trinhdo}
                  onChange={(e) => setTrinhDo(e.target.value)}>
                  <option disabled>Chọn trình độ...</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="C">C</option>
                </CFormSelect>
              </div>
            </CCol>

            {!isEdit &&
              <CCol md={6}>
                <div className="mb-3">
                  <CFormLabel>Ngày thi</CFormLabel>
                  <CFormInput
                    type="date"
                    min={getToDay()}
                    required
                    value={ngaythi}
                    onChange={(e) => { setNgayThi(e.target.value) }}
                  />
                  <CFormFeedback invalid>Vui lòng nhập ngày thi hợp lệ!</CFormFeedback>
                </div>
              </CCol>
            }

            {isEdit &&
              <CCol md={6}>
                <div className="mb-3">
                  <CFormLabel>Ngày thi</CFormLabel>
                  <CFormInput
                    type="date"
                    required
                    value={ngaythi}
                    onChange={(e) => { setNgayThi(e.target.value) }}
                  />
                  <CFormFeedback invalid>Vui lòng nhập ngày thi hợp lệ!</CFormFeedback>
                </div>
              </CCol>
            }

            <CCol md={6}>
              <div className="mb-3">
                <CFormLabel>Số câu thi</CFormLabel>
                <CFormInput
                  type="number"
                  required
                  placeholder="Nhập số câu thi..."
                  min="1"
                  value={sct}
                  onChange={(e) => setSCT(e.target.value)}
                />
                <CFormFeedback invalid>Vui lòng nhập số câu thi hợp lệ!</CFormFeedback>
              </div>
            </CCol>

            <CCol md={6}>
              <div className="mb-3">
                <CFormLabel>Thời gian thi (phút)</CFormLabel>
                <CFormInput
                  type="number"
                  required
                  placeholder="Nhập thời gian thi..."
                  min="1"
                  value={tg}
                  onChange={(e) => setTG(e.target.value)}
                />
                <CFormFeedback invalid>Vui lòng nhập thời gian thi hợp lệ!</CFormFeedback>
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

const getToDay = () => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }

  today = yyyy + '-' + mm + '-' + dd;
  return today;
}
