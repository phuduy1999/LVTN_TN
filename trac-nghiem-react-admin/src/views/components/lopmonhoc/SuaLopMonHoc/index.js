import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import giaoVienApi from 'src/api/giaoVienApi';
import khoaApi from 'src/api/khoaApi';
import lopMHApi from 'src/api/lopMHApi';
import monHocApi from 'src/api/monHocApi';
import AppModalCustom from 'src/components/AppModalCustom';

export default function index() {
  const { id } = useParams();
  const [nienkhoa, setNienKhoa] = useState('');
  const [hocky, setHocKy] = useState(1);
  const [nhom, setNhom] = useState('');
  const [sosvtt, setSOVTT] = useState('');
  const [mamh, setMamh] = useState('');
  const [magv, setMagv] = useState('');
  const [makh, setMakh] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [visible, setVisible] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [mess, setMess] = useState(false)
  const pageRedirect = '/lopmonhoc/ds-lopmonhoc';
  const [lmh, setLMH] = useState({});

  const [validated, setValidated] = useState(false)
  const handleSubmit = event => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    else if (lmh.NIENKHOA.trim() === nienkhoa.trim() && lmh.HOCKY === hocky && lmh.SOSVTT === sosvtt &&
      lmh.NHOM === nhom && lmh.MAMH.trim() === mamh.trim() && lmh.MAKH.trim() === makh.trim() && lmh.MAGV.trim() === magv.trim()) {
      setIsPending(false);
      setVisible(!visible);
      setMess('Bạn chưa sửa gì hết!')
    }
    else {
      setIsPending(true);

      lopMHApi.updateOne(id, {
        MAGV: magv,
        NIENKHOA: nienkhoa,
        HOCKY: hocky,
        NHOM: nhom,
        SOSVTT: sosvtt,
        MAMH: mamh,
        MAKH: makh
      })
        .then(function (response) {
          console.log(response);

          setIsPending(false);
          setVisible(!visible);
          setIsSuccess(true);
          setMess('Sửa lớp môn học thành công!')
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

  const [dskh, setDSKH] = useState([]);
  const [dsmh, setDSMH] = useState([]);
  const [dsgv, setDSGV] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await khoaApi.getAll();
        const response2 = await monHocApi.getAll();
        const response3 = await giaoVienApi.getAll();
        setDSKH(response1);
        setDSMH(response2);
        setDSGV(response3);
        console.log(response1, response2, response3);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await lopMHApi.getOne(id);
        setLMH(response);
        setNienKhoa(response.NIENKHOA.trim());
        setHocKy(response.HOCKY);
        setNhom(response.NHOM);
        setMamh(response.MAMH);
        setSOVTT(response.SOSVTT);
        setMagv(response.MAGV);
        setMakh(response.MAKH);
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
          <strong>Sửa lớp môn học</strong>
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
                  onChange={(e) => setNienKhoa(e.target.value)}
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
