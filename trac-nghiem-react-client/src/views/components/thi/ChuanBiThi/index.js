import { CButton, CCard, CCardBody, CCardHeader, CCol, CContainer, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect, CRow } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import monHocApi from 'src/api/monHocApi';
import dangKyApi from 'src/api/dangKyApi';
import AppModalCustom from 'src/components/AppModalCustom';
import InfoUserLogin from 'src/_infoUser';

export default function index() {
  const [nienkhoa, setNienKhoa] = useState('');
  const [hocky, setHocKy] = useState(1);
  const [nhom, setNhom] = useState('');
  const [mamh, setMamh] = useState('');
  const [isPending, setIsPending] = useState(false);
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
      setIsPending(true);

      dangKyApi.checkRegister({
        NIENKHOA: nienkhoa,
        HOCKY: hocky,
        NHOM: nhom,
        MAMH: mamh,
        MASV: InfoUserLogin().MASV,
      })
        .then(function (response) {
          console.log(response);

          setPageRedirect(`/thi/${response.IDDK}`);
          setIsPending(false);
          setVisible(!visible);
          setIsSuccess(true);
          setMess('Thông tin đăng ký thi hợp lệ! Bạn sẽ được chuyển tới trang thi...')
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

  const handleSetVisible = () => {
    setVisible(false);
  }

  return (
    <div >
      <CContainer>
        <CRow>
          <CCol xs={12}>
            <CCard className="mb-4">
              <CCardHeader>
                <strong>Thông tin đăng ký thi</strong>
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
                    {!isPending && <CButton color="primary" type="submit">
                      Tìm kiếm
                    </CButton>}
                    {isPending && <CButton disabled color="primary">
                      Tìm kiếm...
                    </CButton>}
                  </CCol>
                  <AppModalCustom visible={visible} handleSetVisible={handleSetVisible}
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
