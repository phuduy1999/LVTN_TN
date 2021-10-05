import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormFeedback, CFormInput, CFormLabel } from '@coreui/react';
import React, { useState } from 'react';
import monHocApi from 'src/api/monHocApi';
import AppModalCustom from 'src/components/AppModalCustom';

export default function index() {
  const [mamh, setMamh] = useState('');
  const [tenmh, setTenmh] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [visible, setVisible] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [mess, setMess] = useState(false)
  const pageRedirect = '/monhoc/ds-monhoc';

  const [validated, setValidated] = useState(false)
  const handleSubmit = event => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    else {
      setIsPending(true);

      monHocApi.addOne({
        MAMH: mamh,
        TENMH: tenmh
      })
        .then(function (response) {
          console.log(response);

          setIsPending(false);
          setVisible(!visible);
          setIsSuccess(true);
          setMess('Thêm môn học thành công!')
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
          <strong>Thêm mới môn học</strong>
        </CCardHeader>
        <CCardBody>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <CFormLabel>Mã môn học</CFormLabel>
              <CFormInput
                type="text"
                required
                value={mamh}
                onChange={(e) => setMamh(e.target.value)}
              />
              <CFormFeedback invalid>Vui lòng nhập mã môn học!</CFormFeedback>
            </div>
            <div className="mb-3">
              <CFormLabel>Tên môn học</CFormLabel>
              <CFormInput
                type="text"
                required
                value={tenmh}
                onChange={(e) => setTenmh(e.target.value)}
              />
              <CFormFeedback invalid>Vui lòng nhập tên môn học!</CFormFeedback>
            </div>
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
