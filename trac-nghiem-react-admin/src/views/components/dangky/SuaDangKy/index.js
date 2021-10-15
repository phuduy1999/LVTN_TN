import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dangKyApi from 'src/api/dangKyApi';
import monHocApi from 'src/api/monHocApi';
import AppModalCustom from 'src/components/AppModalCustom';

export default function index() {
  const { id } = useParams();
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
  const [dk, setDK] = useState({});

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
    else if (dk.TRINHDODK.trim() === trinhdo.trim() && dk.SCT === sct &&
      dk.THOIGIANTHI === tg && dk.NGAYTHI.split('T')[0] === ngaythi) {
      setIsPending(false);
      setVisible(!visible);
      setMess('Bạn chưa sửa gì hết!')
    }
    else {
      setIsPending(true);

      dangKyApi.updateOne(id, {
        SCT: sct,
        THOIGIANTHI: tg,
        NGAYTHI: ngaythi,
        TRINHDODK: trinhdo,
      })
        .then(function (response) {
          console.log(response);

          setIsPending(false);
          setVisible(!visible);
          setIsSuccess(true);
          setMess('Sửa đăng ký thi thành công!')
        })
        .catch(function (error) {
          console.log(error.response);
          setIsPending(false);
          setVisible(!visible);
          setMess('Lỗi sửa đăng ký thi! ' + error.response.data.err)
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dangKyApi.getOne(id);
        setDK(response);
        setTrinhDo(response.TRINHDODK.trim());
        setNienKhoa(response.NIENKHOA.trim());
        setHocKy(response.HOCKY);
        setNhom(response.NHOM);
        setMamh(response.MAMH);
        setNgayThi(response.NGAYTHI.split('T')[0]);
        setSCT(response.SCT);
        setTG(response.THOIGIANTHI);
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
          <strong>Sửa đăng ký thi cho lớp môn học</strong>
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
                <CFormInput disabled
                  type="text"
                  required
                  value={nienkhoa}
                />
              </div>
            </CCol>

            <CCol md={3}>
              <div className="mb-3">
                <CFormLabel>Học kỳ</CFormLabel>
                <CFormSelect className="mb-3" disabled
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
                <CFormInput disabled
                  type="number"
                  required
                  min="1"
                  value={nhom}
                />
              </div>
            </CCol>

            <CCol md={3}>
              <div className="mb-3">
                <CFormLabel>Môn học</CFormLabel>
                <CFormSelect className="mb-3" disabled
                  value={mamh}>
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
                Sửa
              </CButton>}
              {isPending && <CButton disabled color="primary">
                Sửa...
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
