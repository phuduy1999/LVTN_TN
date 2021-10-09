import { cilPlus, cilWarning, cilX } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormCheck, CFormFeedback, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow, CTooltip } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import boDeApi from 'src/api/boDeApi';
import loaiCHApi from 'src/api/loaiCHApi';
import monHocApi from 'src/api/monHocApi';
import AppModalCustom from 'src/components/AppModalCustom';
import _chuanHoaChuoi from 'src/_chuanHoaChuoi.js';
import InfoUserLogin from 'src/_infoUser';

export default function index() {
  //new
  const [choices, setChoices] = useState([]);

  //old
  const { id } = useParams();
  const [trinhdo, setTrinhDo] = useState('A');
  const [noidung, setNoiDung] = useState('');
  const [dap_an_dk, setDapAnDK] = useState('');
  const [dap_an_nlc, setDapAnNLC] = useState(null);
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

  const checkLuaChonPhanBietNhau = (choices) => {
    const values = [...choices];
    let arrSort = values.sort((a, b) => a > b ? 1 : -1);
    for (let i = 0; i < arrSort.length - 1; i++) {
      if (arrSort[i] === arrSort[i + 1]) {
        return false;
      }
    }
    return true;
  }

  const chuaSua = () => {
    if (ch.TRINHDO.trim() === trinhdo.trim() && ch.MAMH.trim() === mamh.trim()
      && _chuanHoaChuoi(ch.NOIDUNG) === noidung) {
      if (ch.MALOAICH.trim() === 'DK') {
        if (ch.DAP_AN.trim() === dap_an_dk) {
          return true;
        }
      } else {
        const values = ch.LUACHON.map(lc => {
          return lc.NOIDUNG;
        })
        if (JSON.stringify(values) === JSON.stringify(choices)) {
          return true;
        }
      }
    }
    return false;
  }

  const arrToJsonChoices = (choices) => {
    return choices.map((choice, idx) => {
      return {
        STT: String.fromCharCode(65 + idx),
        NOIDUNG: choice,
      }
    })
  }

  const [validated, setValidated] = useState(false)
  const handleSubmit = event => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    else if (!checkLuaChonPhanBietNhau(choices)) {
      setIsPending(false);
      setVisible(!visible);
      setMess('Các lựa chọn phải phân biệt nhau!');
    }
    else if (chuaSua()) {
      setIsPending(false);
      setVisible(!visible);
      setMess('Bạn chưa sửa gì hết!')
    }
    else {
      setIsPending(true);
      boDeApi.updateOne(id, {
        TRINHDO: trinhdo,
        MAMH: mamh,
        NOIDUNG: noidung,
        MAGV: magv,
        DAP_AN: isDK ? dap_an_dk : String.fromCharCode(65 + parseInt(dap_an_nlc)),
        CAC_LUA_CHON: arrToJsonChoices(choices),
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
        setMagv(InfoUserLogin()?.MAGV);
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
        setNoiDung(_chuanHoaChuoi(response.NOIDUNG));
        setMamh(response.MAMH);
        setMalch(response.MALOAICH);
        if (response.MALOAICH.trim() === 'DK') {
          setDapAnDK(response.DAP_AN.trim());
        }
        else {
          setIsDK(false);
          let idxDapAn;
          setChoices(response.LUACHON.map((c, idx) => {
            if (c.STT === response.DAP_AN.trim()) idxDapAn = idx;
            return c.NOIDUNG;
          }))
          setDapAnNLC(idxDapAn);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchDS();
  }, [])

  const handleSetVisible = () => {
    setVisible(false);
  }

  const demSoLanXuatHien = (str) => {
    let arr = choices.filter(choice => choice === str);
    return arr.length;
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
                  onBlur={(e) => setNoiDung(_chuanHoaChuoi(e.target.value))}
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
                    onBlur={(e) => setDapAnDK(_chuanHoaChuoi(e.target.value))}
                  />
                  <CFormFeedback invalid>Vui lòng nhập đáp án!</CFormFeedback>
                </div>
              </CCol>
            }

            {!isDK &&
              <CRow className="mt-3">
                <CFormLabel>Các lựa chọn(vui lòng chọn đáp án)</CFormLabel>
                {choices.map((choice, idx) => (
                  <CRow key={idx}>
                    <CCol md={2}>
                      <div className="mb-3">
                        <CFormCheck onChange={(e) => setDapAnNLC(e.target.value)}
                          type="radio"
                          name="flexRadioDefault"
                          value={idx}
                          label={`Lựa chọn ${String.fromCharCode(65 + idx)}`}
                          checked={idx === parseInt(dap_an_nlc)}
                          required
                        />
                      </div>
                    </CCol>
                    <CCol md={8}>
                      <div className="mb-3">
                        <CFormInput
                          type="text"
                          required
                          value={choice}
                          onChange={(e) => {
                            const values = [...choices];
                            values[idx] = e.target.value;
                            setChoices(values);

                          }}
                          onBlur={() => {
                            const values = [...choices];
                            values[idx] = (choice.trim() === '') ? `Tùy chọn ${idx + 1}` : _chuanHoaChuoi(values[idx]);
                            setChoices(values);
                          }}
                          onFocus={(e) => {
                            e.target.select();
                          }}
                        />
                      </div>
                    </CCol>
                    <CCol md={1}>
                      {choices.length > 2 &&
                        <CIcon
                          icon={cilX}
                          size='xl'
                          onClick={() => {
                            const values = [...choices];
                            values.splice(idx, 1);
                            setChoices(values);
                            if (idx === parseInt(dap_an_nlc)) {
                              setDapAnNLC(null)
                            }
                            else if (idx < parseInt(dap_an_nlc)) {
                              setDapAnNLC(parseInt(dap_an_nlc) - 1);
                            }
                          }}
                        />
                      }
                      {idx === choices.length - 1 && idx < 25 &&
                        < CIcon
                          icon={cilPlus}
                          size='xl'
                          onClick={() => {
                            setChoices([...choices, `Tùy chọn ${idx + 2}`]);
                          }}
                        />
                      }
                    </CCol>
                    <CCol md={1}>
                      {demSoLanXuatHien(_chuanHoaChuoi(choice)) > 1 &&
                        <CTooltip
                          content="Trùng lựa chọn"
                          placement="right"
                        >
                          <span className="text-warning mt-3">
                            <CIcon
                              icon={cilWarning}
                              size='xl'
                            />
                          </span>
                        </CTooltip>
                      }
                    </CCol>
                  </CRow>
                ))}
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
