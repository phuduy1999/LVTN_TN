import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect, CRow } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import monHocApi from 'src/api/monHocApi';
import dangKyApi from 'src/api/dangKyApi';
import AppModalCustom from 'src/components/AppModalCustom';

export default function index() {
  const [trinhdo, setTrinhDo] = useState('A');
  const [mamh, setMamh] = useState('');
  const [sct, setSCT] = useState('');
  const [tg, setTG] = useState('');
  const [visible, setVisible] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [mess, setMess] = useState(false)
  const [pageRedirect, setPageRedirect] = useState('');

  const [validated, setValidated] = useState(false)
  const handleSubmit = event => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    else {
      dangKyApi.checkTrialRegister({
        SCT: sct,
        MAMH: mamh,
        THOIGIANTHI: tg,
        TRINHDODK: trinhdo,
      })
        .then(function (response) {
          setPageRedirect(`/thi-thu/${trinhdo}/${tg}/${sct}/${mamh}`);
          setVisible(!visible);
          setIsSuccess(true);
          setMess('Thông tin đăng ký thi thử hợp lệ! Bạn sẽ được chuyển tới trang thi...')
        })
        .catch(function (error) {
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
    <CContainer>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Thông tin đăng ký thi thử</strong>
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
                    Thi thử
                  </CButton>
                </CCol>
                <AppModalCustom visible={visible} handleSetVisible={() => { setVisible(false) }}
                  mess={mess} isSuccess={isSuccess} pageRedirect={pageRedirect} />
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}
