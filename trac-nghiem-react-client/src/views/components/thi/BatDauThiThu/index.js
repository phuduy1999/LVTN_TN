import { CBadge, CButton, CCard, CCardBody, CCardHeader, CCol, CDropdownDivider, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CTable, CTableBody, CTableDataCell, CTableHeaderCell, CTableRow } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-scroll';
import dangKyApi from 'src/api/dangKyApi';
import monHocApi from 'src/api/monHocApi';
import AppModalCustom from 'src/components/AppModalCustom';
import CauHoiDK from '../../cauhoi/DienKhuyet';
import CauHoiNLC from '../../cauhoi/NhieuLuaChon';

export default function index() {
  const { td, tg, sct, mamh } = useParams();
  const [visible, setVisible] = useState(false)
  const [visible1, setVisible1] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [mess, setMess] = useState(false)

  const [thongTin, setThongTin] = useState({
    TRINHDODK: td,
    THOIGIANTHI: tg,
    SCT: sct,
    MAMH: mamh,
  });
  const [dsch, setDSCH] = useState([]);
  const [dslc, setDSLC] = useState([]);

  const [timeTring, setTimeString] = useState('');
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [isDanger, setIsDanger] = useState(false);

  const pageRedirect = '/lich-su-thi';

  const handleDongYNopBai = () => {
    setVisible(!visible);
    let soCauDung = 0;
    for (let i = 0; i < dsch.length; i++) {
      if (dslc[i].trim() === dsch[i].DAP_AN) {
        soCauDung++;
      }
    }

    let diem = Math.round(((soCauDung / thongTin.SCT) + Number.EPSILON) * 10 * 100) / 100

    setVisible1(!visible1);
    setIsSuccess(true);
    let strTimeOut = '';
    if (isTimeOut) strTimeOut += 'Hết giờ!';
    setMess(`${strTimeOut} Bạn đã hoàn thành bài thi với số điểm là ${diem} !`);
  }

  useEffect(() => {
    const fetchDS = async () => {
      try {
        const response1 = await monHocApi.getOne(mamh);
        setThongTin({ ...thongTin, TENMH: response1.TENMH });
        const response = await dangKyApi.getQuestionsForTesting({
          TRINHDODK: td,
          SCT: sct,
          MAMH: mamh,
        });
        let ds_luaChon = [];
        for (let i = 0; i < sct; i++) {
          ds_luaChon.push('');
        }
        setDSCH(response);
        setDSLC(ds_luaChon);
      } catch (error) {
        console.log(error);
      }
    }

    fetchDS();
  }, [])

  useEffect(() => {
    //set thời gian
    let t = thongTin.THOIGIANTHI * 60;//số giây
    const clockInterval = setInterval(() => {
      if (t === 0) {
        setIsTimeOut(true);
        clearInterval(clockInterval);
        if (document.getElementById('nop-bai')) {
          document.getElementById('nop-bai').click();
          if (document.getElementById('dong-y-nop-bai')) {
            document.getElementById('dong-y-nop-bai').click();
          }
        }
      }
      if (t <= 10) {
        setIsDanger(true);
      }
      let soPhut = '' + parseInt(t / 60);
      if (t / 60 < 10) soPhut = '0' + soPhut;
      let time = soPhut + ':' + ('0' + t % 60).slice(-2);
      setTimeString(time);
      t = t - 1;
    }, 1000)

    return () => {
      console.log('clean up');
      clearInterval(clockInterval);
    }
  }, [thongTin])

  const handleSetLuaChon = (idx, lc) => { //set danh sách lựa chọn của sv
    const values = [...dslc];
    values[idx] = lc;
    setDSLC(values);
  }

  const handleClickNopBai = () => {
    setVisible(!visible);
  }

  return (
    <CRow>
      <CCol md={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Thông tin đăng ký thi</strong>
          </CCardHeader>
          <CCardBody>
            <CTable bordered>
              <CTableBody>
                <CTableRow>
                  <CTableHeaderCell scope="row">Môn thi:</CTableHeaderCell>
                  <CTableDataCell>{thongTin.TENMH}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">Trình độ đăng ký thi:</CTableHeaderCell>
                  <CTableDataCell>{thongTin.TRINHDODK}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">Thời gian thi:</CTableHeaderCell>
                  <CTableDataCell>{thongTin.THOIGIANTHI} phút</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">Số câu thi:</CTableHeaderCell>
                  <CTableDataCell>{thongTin.SCT}</CTableDataCell>
                </CTableRow>
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>

      <CCol md={9}>
        <CCard className="mb-4">
          <CCardBody>
            {
              dsch && dsch.map((ch, idx) => {
                if (ch.MALOAICH.trim() === 'NLC') {
                  return <CauHoiNLC key={'cau' + (idx + 1)} cauhoi={ch} luachonsv={dslc[idx]} handleSetLuaChon={handleSetLuaChon} idx={idx} />;
                }
                else return <CauHoiDK key={'cau' + (idx + 1)} cauhoi={ch} luachonsv={dslc[idx]} handleSetLuaChon={handleSetLuaChon} idx={idx} />;
              })
            }
          </CCardBody>
        </CCard>
      </CCol>

      <CCol md={3} id='quiz-nav'>
        <CCard className="mb-4" id='sticky'>
          <CCardHeader>
            <strong>Quiz navigation</strong>
          </CCardHeader>
          <CCardBody>
            <CRow >
              {
                dsch && dslc && dsch.map((ch, idx) => (
                  <CCol md={4} key={`col-${(idx + 1)}`}>
                    <Link smooth={true} offset={-120} duration={0}
                      key={`nav-${(idx + 1)}`}
                      to={`cau-hoi-${(idx + 1)}`} >
                      {dslc[idx] === '' &&
                        <span className="text-danger mt-3">
                          {((idx + 1) < 10 ? '0' + (idx + 1) : (idx + 1)) + ": "}
                        </span>}
                      {dslc[idx] !== '' &&
                        <span className="text-success mt-3">
                          {((idx + 1) < 10 ? '0' + (idx + 1) : (idx + 1)) + ": " + (ch.MALOAICH.trim() === "NLC" ? dslc[idx] : '')}
                          {ch.MALOAICH.trim() === 'DK' ? <span>&#10003;</span> : ''}
                        </span>}
                    </Link>
                  </CCol>
                ))
              }
            </CRow>
            <CDropdownDivider />
            <h3 className='mt-5 d-inline'>
              {!isDanger && <CBadge color="info">{timeTring}</CBadge>}
              {isDanger && <CBadge color="danger">{timeTring}</CBadge>}
            </h3>
            <CButton id='nop-bai' onClick={() => handleClickNopBai()} className='ms-4 d-inline' color="link"><h4><CBadge color="success">Nộp bài</CBadge></h4></CButton>
          </CCardBody>
        </CCard>
      </CCol>

      <CModal visible={visible}>
        <CModalHeader onDismiss={() => setVisible(false)}>
          <CModalTitle>Thông báo</CModalTitle>
        </CModalHeader>
        <CModalBody>
          Bạn có đồng ý nộp bài?
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Không
          </CButton>
          <CButton id='dong-y-nop-bai' color="primary" onClick={() => handleDongYNopBai()}>Đồng ý</CButton>
        </CModalFooter>
      </CModal>
      <AppModalCustom visible={visible1} handleSetVisible={() => setVisible(false)}
        mess={mess} isSuccess={isSuccess} pageRedirect={pageRedirect} />
    </CRow>
  )
}
