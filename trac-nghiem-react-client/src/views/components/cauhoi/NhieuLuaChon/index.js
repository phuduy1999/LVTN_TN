import { CAlert, CCard, CCardBody, CCardHeader, CCol, CFormCheck, CListGroup, CListGroupItem, CRow } from '@coreui/react';
import { default as React, useState } from 'react';

export default function index(props) {
  const { cauhoi, luachonsv, handleSetLuaChon, idx, isDisabled } = props;

  const [lc, setLuaChon] = useState('');
  const [ds, setDS] = useState(cauhoi.LUACHON);//danh sách lựa chọn
  const [isDaChon, setIsDaChon] = useState(false);

  return (
    <div id={`cau-hoi-${idx + 1}`}>
      <CRow>
        <CCol xs={2}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Câu {idx + 1}:</strong>
            </CCardHeader>
            <CCardBody>
              {!isDisabled && isDaChon && <span className="text-success">Đáp án đã chọn: {lc}</span>}
              {!isDisabled && !isDaChon && <span className="text-danger">Bạn chưa chọn đáp án!</span>}
              {/* Xem lại bài thi */}
              {isDisabled && cauhoi.LUACHONSV !== '' && <span className="text-success">Đáp án đã chọn: {cauhoi.LUACHONSV}</span>}
              {isDisabled && cauhoi.LUACHONSV === '' && <span className="text-danger">Bạn chưa chọn đáp án!</span>}
            </CCardBody>
          </CCard>
        </CCol>
        <CCol xs={10}>
          <CCard className="mb-4" color="light">
            <CCardBody>
              <CAlert color="info">
                {cauhoi.NOIDUNG}
              </CAlert>
              <CListGroup>
                {ds && ds.map((lc) => (
                  <CListGroupItem component="a" key={"linkTag" + lc.STT}>
                    <CFormCheck key={lc.STT} disabled={isDisabled}
                      type="radio" id={`radio-${idx + 1}-${lc.STT}`}
                      name={idx + 1}
                      label={lc.STT + ": " + lc.NOIDUNG}
                      value={lc.STT}
                      onChange={(e) => {
                        setLuaChon(e.target.value);
                        handleSetLuaChon(idx, lc.STT);
                        setIsDaChon(e.target.value !== '');
                      }}
                      checked={lc.STT === cauhoi.LUACHONSV || lc.STT === luachonsv}
                    />
                  </CListGroupItem>
                ))}
              </CListGroup>
            </CCardBody>
          </CCard>
          {isDisabled && cauhoi.LUACHONSV === cauhoi.DAP_AN &&
            <CAlert color="success">
              Your answer is correct!
            </CAlert>
          }
          {isDisabled && cauhoi.LUACHONSV !== cauhoi.DAP_AN && cauhoi.LUACHONSV !== '' &&
            <CAlert color="danger">
              Your answer is wrong!
            </CAlert>
          }
          {isDisabled && cauhoi.LUACHONSV !== cauhoi.DAP_AN && cauhoi.LUACHONSV === '' &&
            <CAlert color="danger">
              You not choose the answer!
            </CAlert>
          }
        </CCol>
      </CRow>
    </div>
  )
}
