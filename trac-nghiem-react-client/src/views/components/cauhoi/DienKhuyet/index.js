import { CAlert, CCard, CCardBody, CCardHeader, CCol, CFormInput, CFormLabel, CRow } from '@coreui/react';
import { default as React, useEffect, useState } from 'react';

export default function index(props) {
  const { cauhoi, handleSetLuaChon, idx, isDisabled } = props;

  const [lc, setLuaChon] = useState('');
  const [isDaChon, setIsDaChon] = useState(false);

  useEffect(() => {
    if (isDisabled) {
      setLuaChon(cauhoi.LUACHONSV);
    }
  }, [])

  return (
    <div id={`cau-hoi-${idx + 1}`}>
      <CRow>
        <CCol xs={2}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Câu {idx + 1}:</strong>
            </CCardHeader>
            <CCardBody>
              {!isDisabled && isDaChon && <span className="text-success">Đã làm</span>}
              {!isDisabled && !isDaChon && <span className="text-danger">Bạn chưa điền đáp án!</span>}
              {/* Xem lại bài thi */}
              {isDisabled && cauhoi.LUACHONSV !== '' && <span className="text-success">Đã làm</span>}
              {isDisabled && cauhoi.LUACHONSV === '' && <span className="text-danger">Bạn chưa điền đáp án!</span>}
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={10}>
          <CCard className="mb-4" color="light">
            <CCardBody>
              <CAlert color="info">
                {cauhoi.NOIDUNG}
              </CAlert>
              <div className="mb-3">
                <CFormLabel>Answer: </CFormLabel>
                <CFormInput disabled={isDisabled}
                  type="text"
                  required
                  value={lc}
                  onChange={(e) => {
                    setLuaChon(e.target.value);
                    handleSetLuaChon(idx, e.target.value.trim());
                    setIsDaChon(e.target.value !== '');
                  }}
                // maxLength={10} //nen de thuoc tinh nay
                />
              </div>
            </CCardBody>
          </CCard>
          {isDisabled === true && cauhoi.LUACHONSV === cauhoi.DAP_AN &&
            <CAlert color="success">
              Your answer is correct!
            </CAlert>
          }
          {isDisabled === true && cauhoi.LUACHONSV !== cauhoi.DAP_AN && cauhoi.LUACHONSV !== '' &&
            <CAlert color="danger">
              Your answer is wrong!
            </CAlert>
          }
          {isDisabled === true && cauhoi.LUACHONSV !== cauhoi.DAP_AN && cauhoi.LUACHONSV === '' &&
            <CAlert color="danger">
              Your not write the answer!
            </CAlert>
          }
        </CCol>
      </CRow>
    </div>
  )
}
