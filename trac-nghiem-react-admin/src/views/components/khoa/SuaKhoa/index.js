import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormFeedback, CFormInput, CFormLabel } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import khoaApi from 'src/api/khoaApi';
import AppModalCustom from 'src/components/AppModalCustom';

export default function index() {
  const { id } = useParams();
  const [makh, setMakh] = useState('');
  const [tenkh, setTenkh] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [visible, setVisible] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [mess, setMess] = useState(false)
  const pageRedirect = '/khoa/ds-khoa';
  const [kh, setKH] = useState({});

  useEffect(() => {
    const fetchDS = async () => {
      try {
        const response = await khoaApi.getOne(id);
        setKH(response);
        setMakh(response.MAKH.trim());
        setTenkh(response.TENKH.trim());
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchDS();
  }, [])

  const [validated, setValidated] = useState(false)
  const handleSubmit = event => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    else if (kh.MAKH.trim() === makh.trim() && kh.TENKH.trim() === tenkh.trim()) {
      setIsPending(false);
      setVisible(!visible);
      setMess('Bạn chưa sửa gì hết!')
    }
    else {
      setIsPending(true);

      khoaApi.updateOne(id, {
        MAKH: makh,
        TENKH: tenkh
      })
        .then(function (response) {
          console.log(response);

          setIsPending(false);
          setVisible(!visible);
          setIsSuccess(true);
          setMess('Sửa khoa thành công!')

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
          <strong>Sửa khoa</strong>
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
                Sửa
              </CButton>}
              {isPending && <CButton disabled color="primary">
                Sửa...
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
