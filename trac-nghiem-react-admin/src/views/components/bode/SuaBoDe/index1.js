import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormCheck, CFormFeedback, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import boDeApi from 'src/api/boDeApi';
import loaiCHApi from 'src/api/loaiCHApi';
import monHocApi from 'src/api/monHocApi';
import AppModalCustom from 'src/components/AppModalCustom';

export default function index() {
  const { id } = useParams();
  const [trinhdo, setTrinhDo] = useState('A');
  const [noidung, setNoiDung] = useState('');
  const [dap_an_dk, setDapAnDK] = useState('');
  const [dap_an_nlc, setDapAnNLC] = useState('A');
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [d, setD] = useState('');
  const [mamh, setMamh] = useState('');
  const [magv, setMagv] = useState('');
  const [malch, setMalch] = useState('');
  const [isPending, setIsPending] = useState(false);
  const [visible, setVisible] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [mess, setMess] = useState(false)
  const [isDK, setIsDK] = useState(true);
  const pageRedirect = '/bode/ds-bode';
  const [ch, setCH] = useState({});
  const [dslc, setDSLC] = useState([]);

  const [validated, setValidated] = useState(false)
  const handleSubmit = event => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    else if (ch.MALOAICH.trim() === 'DK' && ch.TRINHDO.trim() === trinhdo.trim() &&
      ch.MAMH.trim() === mamh.trim() && ch.NOIDUNG.trim() === noidung.trim() && ch.DAP_AN.trim() === dap_an_dk.trim()) {
      setIsPending(false);
      setVisible(!visible);
      setMess('Bạn chưa sửa gì hết!')
    }
    else if (ch.MALOAICH.trim() === 'NLC' && ch.TRINHDO.trim() === trinhdo.trim() &&
      ch.MAMH.trim() === mamh.trim() && ch.NOIDUNG.trim() === noidung.trim() && ch.DAP_AN.trim() === dap_an_nlc.trim()
      && a.trim() === dslc[0] && b.trim() === dslc[1] && c.trim() === dslc[2] && d.trim() === dslc[3]) {
      setIsPending(false);
      setVisible(!visible);
      setMess('Bạn chưa sửa gì hết!')
    }
    else {
      let dapAn;
      if (isDK) dapAn = dap_an_dk;
      else {
        dapAn = dap_an_nlc;
        if ((dap_an_nlc === 'C' && c === '') || (dap_an_nlc === 'D' && d === '')) {
          setVisible(!visible);
          setMess(`Chọn đáp án ${dap_an_nlc} vui lòng nhập nội dung!`);
          return;
        }
        else if (c === '' && d !== '') {
          setVisible(!visible);
          setMess('Có lựa chọn D vui lòng nhập thêm lựa chọn C!');
          return;
        }
        else {
          let arrLc = [a, b];
          if (c !== '') arrLc.push(c);
          if (d !== '') arrLc.push(d);

          let arrSort = arrLc.sort((a, b) => a > b ? 1 : -1);

          for (let i = 0; i < arrSort.length - 1; i++) {
            if (arrSort[i] === arrSort[i + 1]) {
              setVisible(!visible);
              setMess('Các lựa chọn phải phân biệt nhau!');
              return;
            }
          }
        }
      }

      setIsPending(true);
      boDeApi.updateOne(id, {
        TRINHDO: trinhdo,
        MAMH: mamh,
        NOIDUNG: noidung,
        MAGV: magv,
        DAP_AN: dapAn,
        A: a,
        B: b,
        C: c,
        D: d,
      })
        .then(response => {
          console.log(response);

          setIsPending(false);
          setVisible(!visible);
          setIsSuccess(true);
          setMess('Sửa bộ đề thành công!')
        })
        .catch(error => {
          console.log(error);

          setIsPending(false);
          setVisible(!visible);
          setMess('Lỗi: ' + error.response.data.err)
        })
    }
    setValidated(true)
    console.log(dap_an_nlc);
  }

  const [dslch, setDSLCH] = useState([]);
  const [dsmh, setDSMH] = useState([]);

  useEffect(() => {
    const fetchDS = async () => {
      try {
        const response1 = await loaiCHApi.getAll();
        const response2 = await monHocApi.getAll();
        setDSLCH(response1);
        setDSMH(response2);
        setMagv(localStorage.getItem('MAGV'));
        console.log(response1, response2);
      } catch (error) {
        console.log(error);
      }
    }

    fetchDS();
  }, [])

  useEffect(() => {
    const fetchDS = async () => {
      try {
        const response = await boDeApi.getOne(id);
        setCH(response);
        setTrinhDo(response.TRINHDO.trim());
        setNoiDung(response.NOIDUNG.trim());
        setMamh(response.MAMH);
        setMalch(response.MALOAICH);
        if (response.MALOAICH.trim() === 'DK') {
          setIsDK(true);
          setDapAnDK(response.DAP_AN.trim());
        }
        else {
          setIsDK(false);
          setDapAnNLC(response.DAP_AN.trim())
          if (document.getElementById(`da-${response.DAP_AN.trim()}`)) {
            document.getElementById(`da-${response.DAP_AN.trim()}`).checked = true;
          }
          const response1 = await boDeApi.getLuaChon(id);
          console.log(response1)
          let arrDSLC = [];
          arrDSLC.push(response1[0].NOIDUNG);
          arrDSLC.push(response1[1].NOIDUNG);
          setA(response1[0].NOIDUNG);
          setB(response1[1].NOIDUNG);
          if (response1[2]) {
            setC(response1[2].NOIDUNG);
            arrDSLC.push(response1[2].NOIDUNG);
          }
          else arrDSLC.push('');
          if (response1[3]) {
            setD(response1[3].NOIDUNG);
            arrDSLC.push(response1[3].NOIDUNG);
          }
          else arrDSLC.push('');
          setDSLC(arrDSLC);
        }
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
          <strong>Sửa câu hỏi thi</strong>
        </CCardHeader>
        <CCardBody>
          <CForm
            className="row g-3 needs-validation"
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
          >

            <CCol md={4}>
              <div className="mb-3">
                <CFormLabel>Trình độ</CFormLabel>
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
                <CFormLabel>Loại câu hỏi</CFormLabel>
                <CFormSelect className="mb-3" disabled
                  value={malch}>
                  <option disabled>Chọn loại câu hỏi...</option>
                  {dslch && (dslch.map((lch) => (
                    <option value={lch.MALOAICH} key={lch.MALOAICH}>{lch.TENLOAICH}</option>
                  )))}
                </CFormSelect>
              </div>
            </CCol>

            <CCol md={12}>
              <div className="mb-3">
                <CFormLabel>Nội dung</CFormLabel>
                <CFormTextarea
                  type="text"
                  required
                  value={noidung}
                  onChange={(e) => setNoiDung(e.target.value)}
                ></CFormTextarea>
                <CFormFeedback invalid>Vui lòng nhập nội dung!</CFormFeedback>
              </div>
            </CCol>

            {isDK &&
              <CCol md={6}>
                <div className="mb-3">
                  <CFormLabel>Đáp án</CFormLabel>
                  <CFormInput
                    type="text"
                    required
                    value={dap_an_dk}
                    onChange={(e) => setDapAnDK(e.target.value)}
                  />
                  <CFormFeedback invalid>Vui lòng nhập đáp án!</CFormFeedback>
                </div>
              </CCol>
            }

            {!isDK &&
              <CRow className="mt-3">
                <CFormLabel>Các lựa chọn(vui lòng chọn đáp án)</CFormLabel>
                <CCol md={6}>
                  <div className="mb-3">
                    <CFormCheck onChange={(e) => setDapAnNLC(e.target.value)}
                      type="radio" value="A"
                      name="flexRadioDefault"
                      id="da-A"
                      label="A"
                      defaultChecked />
                    <CFormInput
                      type="text"
                      required
                      value={a}
                      onChange={(e) => setA(e.target.value)}
                    />
                    <CFormFeedback invalid>Vui lòng nhập câu A!</CFormFeedback>
                  </div>
                </CCol>
                <CCol md={6}>
                  <div className="mb-3">
                    <CFormCheck onChange={(e) => setDapAnNLC(e.target.value)}
                      type="radio" value="B"
                      name="flexRadioDefault"
                      id="da-B"
                      label="B" />
                    <CFormInput
                      type="text"
                      required
                      value={b}
                      onChange={(e) => setB(e.target.value)}
                    />
                    <CFormFeedback invalid>Vui lòng nhập câu B!</CFormFeedback>
                  </div>
                </CCol>
                <CCol md={6}>
                  <div className="mb-3">
                    <CFormCheck onChange={(e) => {
                      setDapAnNLC(e.target.value);

                    }}
                      type="radio" value="C"
                      name="flexRadioDefault"
                      id="da-C"
                      label="C" />
                    <CFormInput id='input-c'
                      type="text"
                      value={c}
                      onChange={(e) => setC(e.target.value)}
                    />
                    <CFormFeedback invalid>Vui lòng nhập câu C!</CFormFeedback>
                  </div>
                </CCol>
                <CCol md={6}>
                  <div className="mb-3">
                    <CFormCheck onChange={(e) => setDapAnNLC(e.target.value)}
                      type="radio" value="D"
                      name="flexRadioDefault"
                      id="da-D"
                      label="D" />
                    <CFormInput
                      type="text"
                      value={d}
                      onChange={(e) => setD(e.target.value)}
                    />
                    <CFormFeedback invalid>Vui lòng nhập câu D!</CFormFeedback>
                  </div>
                </CCol>
              </CRow>
            }

            <CCol xs={12}>
              {!isPending && <CButton color="primary" type="submit">
                Sửa
              </CButton>}
              {isPending && <CButton disabled color="primary">
                Sửa...
              </CButton>}
            </CCol>
            <AppModalCustom visible={visible} handleSetVisible={handleSetVisible}
              mess={mess} isSuccess={isSuccess} pageRedirect={pageRedirect} />
          </CForm>
        </CCardBody>
      </CCard>
    </CCol >
  )
}
