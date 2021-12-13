import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect, CRow } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import monHocApi from 'src/api/monHocApi';
import dangKyLopMHApi from 'src/api/dangKyLopMHApi';
import AppModalCustom from 'src/components/AppModalCustom';
import InfoUserLogin from 'src/_infoUser';
import _chuanHoaChuoi from 'src/_chuanHoaChuoi.js';

export default function index() {
  const [nienkhoa, setNienKhoa] = useState('');
  const [hocky, setHocKy] = useState(1);
  const [nhom, setNhom] = useState('');
  const [mamh, setMamh] = useState('');
  const [visible, setVisible] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [mess, setMess] = useState(false)
  const pageRedirect = '/ds-dang-ky-lopmh';


  const [validated, setValidated] = useState(false)
  const handleSubmit = event => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    else if (!validateNienKhoa(nienkhoa)) {
      setVisible(!visible);
      setMess('Niên khóa không hợp lệ');
    }
    else {

      const user = InfoUserLogin();

      dangKyLopMHApi.registerClass({
        NIENKHOA: nienkhoa,
        HOCKY: hocky,
        NHOM: nhom,
        MAMH: mamh,
        MASV: user.MASV,
      })
        .then(function (response) {
          console.log(response);

          setVisible(!visible);
          setIsSuccess(true);
          setMess('Bạn đã đăng ký lớp môn học thành công!')
        })
        .catch(function (error) {
          console.log(error.response);
          setIsSuccess(false);
          setVisible(!visible);
          setMess('Lỗi: ' + error.response.data.err)
        });
    }
    setValidated(true)
  }

  const [ds, setDS] = useState([]);

  useEffect(() => {
    const fetchDS = async () => {
      try {
        const response = await monHocApi.getAll();
        setDS(response);
        setMamh(response[0].MAMH);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchDS();
  }, [])

  return (
    <div >
      <CContainer>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Thông tin đăng ký lớp môn học cho sinh viên</strong>
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
                        value={nienkhoa}
                        placeholder="Vd: 2020-2021"
                        onChange={(e) => setNienKhoa(_chuanHoaChuoi(e.target.value))}
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
                        min="1"
                        value={nhom}
                        placeholder="Nhập nhóm..."
                        onChange={(e) => setNhom(e.target.value)}
                      />
                      <CFormFeedback invalid>Vui lòng nhập nhóm hợp lệ!</CFormFeedback>
                    </div>
                  </CCol>


                  <CCol md={6}>
                    <div className="mb-3">
                      <CFormLabel>Môn học</CFormLabel>
                      <CFormSelect className="mb-3"
                        value={mamh}
                        onChange={(e) => setMamh(e.target.value)}>
                        <option disabled>Chọn môn học...</option>
                        {ds && (ds.map((mh) => (
                          <option value={mh.MAMH} key={mh.MAMH}>{mh.TENMH}</option>
                        )))}
                      </CFormSelect>
                    </div>
                  </CCol>

                  <CCol xs={12}>
                    <CButton color="primary" type="submit">
                      Đăng ký
                    </CButton>
                  </CCol>
                  <AppModalCustom visible={visible} handleSetVisible={() => { setVisible(false); }}
                    mess={mess} isSuccess={isSuccess} pageRedirect={pageRedirect} />
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

const validateNienKhoa = (nienkhoa) => {
  if (nienkhoa) {
    const years = nienkhoa.split('-');
    if (years.length === 2) {
      const yearStart = parseInt(years[0]);
      const yearEnd = parseInt(years[1]);
      if (yearStart !== NaN && yearEnd !== NaN) {
        if (yearEnd - yearStart === 1 && yearStart >= 1900 && yearEnd <= 2999) {
          return true;
        }
      }
    }
  }
  return false;
}
