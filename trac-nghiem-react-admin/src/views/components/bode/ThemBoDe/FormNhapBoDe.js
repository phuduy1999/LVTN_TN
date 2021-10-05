import { CButton, CCol, CForm, CFormCheck, CFormFeedback, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow, CSpinner } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import boDeApi from 'src/api/boDeApi';
import loaiCHApi from 'src/api/loaiCHApi';
import monHocApi from 'src/api/monHocApi';
import AppModalCustom from 'src/components/AppModalCustom';

export default function FormNhapBoDe() {
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

  const [validated, setValidated] = useState(false)
  const handleSubmit = event => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
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
      boDeApi.addOne({
        TRINHDO: trinhdo,
        MAMH: mamh,
        MALOAICH: malch,
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
          setMess('Thêm bộ đề thành công!')
        })
        .catch(error => {
          console.log(error);

          setIsPending(false);
          setVisible(!visible);
          setMess('Lỗi thêm bộ đề! ' + error.response.data.err)
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
        setMalch(response1[0].MALOAICH);
        setDSMH(response2);
        setMamh(response2[0].MAMH);
        setMagv(localStorage.getItem('MAGV'));
        console.log(response1, response2);
      } catch (error) {
        console.log(error);
      }
    }

    fetchDS();
  }, [])

  const handleSetVisible = () => {
    setVisible(false);
  }

  const handleLoaiCauHoi = (e) => {
    setMalch(e.target.value);
    if (e.target.value.trim() === 'DK') {
      setIsDK(true);
    } else {
      setIsDK(false);
    }
  }

  useEffect(() => {
    if (malch.trim() === 'NLC') {
      document.getElementById(`da-${dap_an_nlc}`).checked = true;
    }
  }, [malch])

  return (
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
          <CFormSelect className="mb-3"
            value={malch}
            onChange={(e) => handleLoaiCauHoi(e)}>
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
              <CFormInput
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
          Thêm
        </CButton>}
        {isPending && <CButton disabled color="primary">
          <CSpinner component="span" size="sm" aria-hidden="true" />
          Thêm...
        </CButton>}
      </CCol>
      <AppModalCustom visible={visible} handleSetVisible={handleSetVisible}
        mess={mess} isSuccess={isSuccess} pageRedirect={pageRedirect} />
    </CForm>
  )
}
