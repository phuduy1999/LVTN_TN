import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormFeedback, CFormInput, CFormLabel } from '@coreui/react';
import React, { useState } from 'react';
import khoaApi from 'src/api/khoaApi';
import AppModalCustom from 'src/components/AppModalCustom';

export default function index() {
  const [makh, setMakh] = useState('');
  const [tenkh, setTenkh] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [visible, setVisible] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [mess, setMess] = useState(false)
  const pageRedirect = '/khoa/ds-khoa';

  const [validated, setValidated] = useState(false)
  const handleSubmit = event => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    else {
      setIsPending(true);

      khoaApi.addOne({
        MAKH: makh,
        TENKH: tenkh
      })
        .then(function (response) {
          console.log(response);

          setIsPending(false);
          setVisible(!visible);
          setIsSuccess(true);
          setMess('Thêm khoa thành công!')

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
          <strong>Thêm mới khoa</strong>
        </CCardHeader>
        <CCardBody>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <div className="mb-3">
              <CFormLabel>Mã khoa</CFormLabel>
              <CFormInput
                type="text"
                required
                value={makh}
                onChange={(e) => setMakh(e.target.value)}
              />
              <CFormFeedback invalid>Vui lòng nhập mã khoa!</CFormFeedback>
            </div>
            <div className="mb-3">
              <CFormLabel>Tên khoa</CFormLabel>
              <CFormInput
                type="text"
                required
                value={tenkh}
                onChange={(e) => setTenkh(e.target.value)}
              />
              <CFormFeedback invalid>Vui lòng nhập tên khoa!</CFormFeedback>
            </div>
            <CCol xs={12}>
              {!isPending && <CButton color="primary" type="submit">
                Thêm
              </CButton>}
              {isPending && <CButton disabled color="primary">
                Thêm...
              </CButton>}
              <AppModalCustom visible={visible} handleSetVisible={handleSetVisible}
                mess={mess} isSuccess={isSuccess} pageRedirect={pageRedirect} />
            </CCol>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  )
}
