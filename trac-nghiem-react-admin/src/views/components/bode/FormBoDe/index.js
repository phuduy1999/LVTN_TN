import { cilPlus, cilWarning, cilX } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CCol, CForm, CFormCheck, CFormFeedback, CFormInput, CFormLabel, CFormSelect, CFormTextarea, CRow, CTooltip } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import loaiCHApi from 'src/api/loaiCHApi';
import monHocApi from 'src/api/monHocApi';
import _chuanHoaChuoi from 'src/_chuanHoaChuoi.js';

export default function index(props) {
  const {
    handleSubmit,
    validated,
    btnTitle,
    isEdit,
    choices, setChoices,
    trinhdo, setTrinhDo,
    noidung, setNoiDung,
    dap_an_dk, setDapAnDK,
    dap_an_nlc, setDapAnNLC,
    mamh, setMamh,
    malch, setMalch,
    isDK, setIsDK,
  } = props;

  const [dslch, setDSLCH] = useState([]);
  const [dsmh, setDSMH] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchLoaiCH = loaiCHApi.getAll();
      const fetchMH = monHocApi.getAll();
      try {
        const result = await Promise.all([fetchLoaiCH, fetchMH]);
        setDSLCH(result[0]);
        setMalch(result[0][0].MALOAICH);
        setDSMH(result[1]);
        setMamh(result[1][0].MAMH);
        console.log(result);
      }
      catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])

  const demSoLanXuatHien = (str) => {
    let arr = choices.filter(choice => choice === str);
    return arr.length;
  }

  const handleLoaiCauHoi = (e) => {
    setMalch(e.target.value);
    setIsDK(e.target.value.trim() === 'DK');
  }

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
            disabled={isEdit}
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
            placeholder="Nhập nội dung câu hỏi..."
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
              placeholder="Nhập đáp án..."
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
                {idx === choices.length - 1 && idx < 5 &&
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
        <CButton color="primary" type="submit">
          {btnTitle}
        </CButton>
      </CCol>
    </CForm>
  )
}
