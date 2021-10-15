import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import dangKyApi from 'src/api/dangKyApi';
import monHocApi from 'src/api/monHocApi';
import AppModalCustom from 'src/components/AppModalCustom';
import InfoUserLogin from 'src/_infoUser';

export default function index() {
  const [trinhdo, setTrinhDo] = useState('A');
  const [nienkhoa, setNienKhoa] = useState('');
  const [hocky, setHocKy] = useState(1);
  const [nhom, setNhom] = useState('');
  const [ngaythi, setNgayThi] = useState('');
  const [mamh, setMamh] = useState('');
  const [sct, setSCT] = useState('');
  const [tg, setTG] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [visible, setVisible] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [mess, setMess] = useState(false)
  const pageRedirect = '/dangky/ds-dangky';

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

  const [validated, setValidated] = useState(false)
  const handleSubmit = event => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    else {
      setIsPending(true);

      dangKyApi.addOne({
        MAGVDK: InfoUserLogin()?.MAGV,
        NIENKHOA: nienkhoa,
        HOCKY: hocky,
        NHOM: nhom,
        SCT: sct,
        MAMH: mamh,
        THOIGIANTHI: tg,
        NGAYTHI: ngaythi,
        TRINHDODK: trinhdo,
      })
        .then(function (response) {
          console.log(response);

          setIsPending(false);
          setVisible(!visible);
          setIsSuccess(true);
          setMess('Đăng ký thi thành công!')
        })
        .catch(function (error) {
          console.log(error.response);
          setIsPending(false);
          setVisible(!visible);
          setMess(error.response.data.err)
        });
    }
    setValidated(true)
  }

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
          <strong>Đăng ký thi cho lớp môn học</strong>
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
                  value={nienkhoa}
                  onChange={(e) => setNienKhoa(e.target.value)}
                />
                <CFormFeedback invalid>Vui lòng nhập niên khóa hợp lệ!</CFormFeedback>
              </div>
            </CCol>

            <CCol md={3}>
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

            <CCol md={3}>
              <div className="mb-3">
                <CFormLabel>Nhóm</CFormLabel>
                <CFormInput
                  type="number"
                  required
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

            <CCol md={6}>
              <div className="mb-3">
                <CFormLabel>Ngày thi</CFormLabel>
                <CFormInput
                  type="date"
                  min={today}
                  required
                  value={ngaythi}
                  onChange={(e) => {
                    setNgayThi(e.target.value)
                    console.log(e.target.value);
                  }}
                />
                <CFormFeedback invalid>Vui lòng nhập ngày thi hợp lệ!</CFormFeedback>
              </div>
            </CCol>

            <CCol md={6}>
              <div className="mb-3">
                <CFormLabel>Số câu thi</CFormLabel>
                <CFormInput
                  type="number"
                  required
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
                  min="1"
                  value={tg}
                  onChange={(e) => setTG(e.target.value)}
                />
                <CFormFeedback invalid>Vui lòng nhập thời gian thi hợp lệ!</CFormFeedback>
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
            <AppModalCustom visible={visible} handleSetVisible={() => { setVisible(false) }}
              mess={mess} isSuccess={isSuccess} pageRedirect={pageRedirect} />
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  )
}
