import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormFeedback, CFormInput, CFormLabel, CFormSelect } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import giaoVienApi from 'src/api/giaoVienApi';
import khoaApi from 'src/api/khoaApi';
import nhomQuyenApi from 'src/api/nhomQuyenApi';
import AppModalCustom from 'src/components/AppModalCustom';

export default function index() {
  const [magv, setMagv] = useState('');
  const [ten, setTen] = useState('');
  const [ho, setHo] = useState('');
  const [diachi, setDiaChi] = useState('');
  const [sdt, setSDT] = useState('');
  const [email, setEmail] = useState('');
  const [makh, setMakh] = useState('');
  const [manq, setManq] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [visible, setVisible] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [mess, setMess] = useState(false)
  const pageRedirect = '/giaovien/ds-giaovien';

  const [validated, setValidated] = useState(false)
  const handleSubmit = event => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    else {
      setIsPending(true);

      giaoVienApi.addOne({
        MAGV: magv,
        HO: ho,
        TEN: ten,
        DIACHI: diachi,
        EMAIL: email,
        SDT: sdt,
        MAKH: makh,
        MANQ: manq,
      })
        .then(function (response) {
          console.log(response);

          setIsPending(false);
          setVisible(!visible);
          setIsSuccess(true);
          setMess('Thêm giáo viên thành công!')
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
  const [dsnq, setDSNQ] = useState([]);

  useEffect(() => {
    const fetchDS = async () => {
      try {
        const response = await khoaApi.getAll();
        setDS(response);
        setMakh(response[0].MAKH);
        const response1 = await nhomQuyenApi.getAll();
        setDSNQ(response1);
        setManq(response1[0].MANQ);
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
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Thêm mới giáo viên</strong>
        </CCardHeader>
        <CCardBody>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >
            <CCol md={3}>
              <div className="mb-3">
                <CFormLabel>Mã giáo viên</CFormLabel>
                <CFormInput
                  type="text"
                  required
                  value={magv}
                  onChange={(e) => setMagv(e.target.value)}
                />
                <CFormFeedback invalid>Vui lòng nhập mã giáo viên!</CFormFeedback>
              </div>
            </CCol>

            <CCol md={4}>
              <div className="mb-3">
                <CFormLabel>Họ</CFormLabel>
                <CFormInput
                  type="text"
                  required
                  value={ho}
                  onChange={(e) => setHo(e.target.value)}
                />
                <CFormFeedback invalid>Vui lòng nhập họ giáo viên!</CFormFeedback>
              </div>
            </CCol>

            <CCol md={5}>
              <div className="mb-3">
                <CFormLabel>Tên</CFormLabel>
                <CFormInput
                  type="text"
                  required
                  value={ten}
                  onChange={(e) => setTen(e.target.value)}
                />
                <CFormFeedback invalid>Vui lòng nhập tên giáo viên!</CFormFeedback>
              </div>
            </CCol>

            <CCol md={12}>
              <div className="mb-3">
                <CFormLabel>Địa chỉ</CFormLabel>
                <CFormInput
                  type="text"
                  required
                  value={diachi}
                  onChange={(e) => setDiaChi(e.target.value)}
                />
                <CFormFeedback invalid>Vui lòng nhập địa chỉ!</CFormFeedback>
              </div>
            </CCol>

            <CCol md={6}>
              <div className="mb-3">
                <CFormLabel>Email</CFormLabel>
                <CFormInput
                  type="email"
                  placeholder="name@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <CFormFeedback invalid>Vui lòng nhập Email hợp lệ!</CFormFeedback>
              </div>
            </CCol>

            <CCol md={6}>
              <div className="mb-3">
                <CFormLabel>Số điện thoại</CFormLabel>
                <CFormInput
                  type="tel"
                  required
                  value={sdt}
                  onChange={(e) => setSDT(e.target.value)}
                />
                <CFormFeedback invalid>Vui lòng nhập số điện thoại hợp lệ!</CFormFeedback>
              </div>
            </CCol>

            <CCol md={6}>
              <div className="mb-3">
                <CFormLabel>Khoa</CFormLabel>
                <CFormSelect className="mb-3"
                  value={makh}
                  onChange={(e) => setMakh(e.target.value)}>
                  <option disabled>Chọn khoa...</option>
                  {ds && (ds.map((kh) => (
                    <option value={kh.MAKH} key={kh.MAKH}>{kh.TENKH}</option>
                  )))}
                </CFormSelect>
              </div>
            </CCol>

            <CCol md={6}>
              <div className="mb-3">
                <CFormLabel>Nhóm quyền</CFormLabel>
                <CFormSelect className="mb-3"
                  value={manq}
                  onChange={(e) => setManq(e.target.value)}>
                  <option disabled>Chọn nhóm quyền...</option>
                  {dsnq && (dsnq.map((nq) => {
                    if (nq.MANQ.trim() !== 'SV') {
                      return (<option value={nq.MANQ} key={nq.MANQ}>{nq.TENQUYEN}</option>);
                    }
                    return '';
                  }
                  ))}
                </CFormSelect>
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
            <AppModalCustom visible={visible} handleSetVisible={handleSetVisible}
              mess={mess} isSuccess={isSuccess} pageRedirect={pageRedirect} />
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  )
}
