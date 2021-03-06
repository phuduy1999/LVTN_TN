import { CBadge, CButton, CCard, CCardBody, CCardHeader, CCol, CDropdownDivider, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle, CRow, CTable, CTableBody, CTableDataCell, CTableHeaderCell, CTableRow } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-scroll';
import dangKyApi from 'src/api/dangKyApi';
import ghiBaiThiApi from 'src/api/ghiBaiThiApi';
import thiApi from 'src/api/thiApi';
import sinhVienApi from 'src/api/sinhVienApi';
import AppModalCustom from 'src/components/AppModalCustom';
import CauHoiDK from '../../cauhoi/DienKhuyet';
import CauHoiNLC from '../../cauhoi/NhieuLuaChon';
import InfoUserLogin from 'src/_infoUser';
import _chuanHoaChuoi from 'src/_chuanHoaChuoi';
import _formatDate from 'src/_formatDate';

export default function index() {
  const { id } = useParams();
  const [visible, setVisible] = useState(false)
  const [visible1, setVisible1] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [mess, setMess] = useState(false)

  const [thongTin, setThongTin] = useState([]);
  const [dsch, setDSCH] = useState([]);
  const [sv, setSV] = useState({});
  const [dslc, setDSLC] = useState([]);

  const [timeTring, setTimeString] = useState('');
  const [isTimeOut, setIsTimeOut] = useState(false);
  const [isDanger, setIsDanger] = useState(false);

  const pageRedirect = '/lich-su-thi';

  const handleDongYNopBai = async () => {
    setVisible(!visible);
    let soCauDung = 0;
    for (let i = 0; i < dsch.length; i++) {
      if (_chuanHoaChuoi(dslc[i]).toUpperCase() === dsch[i].DAP_AN.toUpperCase()) {
        soCauDung++;
      }
    }
    //ghi điểm
    let diem = Math.round(((soCauDung / thongTin.SCT) + Number.EPSILON) * 10 * 100) / 100
    diem = Math.round(diem * 2) / 2;

    try {
      const arr = dsch.map((ch, idx) => {
        return {
          IDCAUHOI: ch.IDCAUHOI,
          STT: (idx + 1),
          LUACHONSV: dslc[idx],
        }
      })
      const ctbt = {
        CTBT: arr,
        INFO: {
          IDDK: id,
          DIEM: diem,
        }
      }
      const response = await ghiBaiThiApi.recordMark(ctbt)
      console.log(response);

      setVisible1(!visible1);
      setIsSuccess(true);
      let strTimeOut = '';
      if (isTimeOut) strTimeOut += 'Hết giờ!';
      setMess(`${strTimeOut} Bạn đã hoàn thành bài thi với số điểm là ${diem} !`);
    } catch (error) {
      console.log(error);
      setVisible1(!visible1);
      setMess('Lỗi ghi điểm');
    }
  }

  useEffect(() => {
    const fetchDS = async () => {
      try {
        const response = await dangKyApi.getOneByIDDK(id);
        const response1 = await dangKyApi.getQuestions({
          IDDK: id,
        });
        const response2 = await sinhVienApi.getOneByEmail(InfoUserLogin().EMAIL);
        // let ds_luaChon = [];
        // for (let i = 0; i < response.SCT; i++) {
        //   ds_luaChon.push('');
        // }
        setThongTin(response);
        setDSCH(response1.DS_CAUHOI);
        setSV(response2);
        setDSLC(response1.DS_LUACHON);
        console.log(response1);
      } catch (error) {
        console.log(error);
      }
    }

    fetchDS();
  }, [])

  useEffect(() => {
    //set thời gian
    let t = thongTin.THOIGIANCONLAI_S === null ? thongTin.THOIGIANTHI * 60 : thongTin.THOIGIANCONLAI_S;
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
      if (t % 10 === 0) {
        try {
          const response = thiApi.updateTimer({
            IDDK: id,
            THOIGIANCONLAI_S: t
          })
        }
        catch (e) {
          clearInterval(clockInterval);
        }
      }
    }, 1000)

    return () => {
      console.log('clean up');
      clearInterval(clockInterval);
    }
  }, [thongTin])

  const handleSetLuaChon = (idx, lc) => { //set danh sách lựa chọn của sv
    const values = [...dslc];
    values[idx] = lc;
    try {
      const response = thiApi.updateChoice({
        IDDK: id,
        STT: idx + 1,
        LUACHONSV: lc,
      })
      setDSLC(values);
      console.log(values);
    }
    catch (e) {
      console.log(e);
    }
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
                  <CTableHeaderCell scope="row">Sinh viên:</CTableHeaderCell>
                  <CTableDataCell>Mã sinh viên: {sv.MASV}</CTableDataCell>
                  <CTableDataCell>Họ tên: {sv.HO + " " + sv.TEN}</CTableDataCell>
                  <CTableDataCell>Ngày sinh: {_formatDate(sv.NGAYSINH)}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">Lớp môn học:</CTableHeaderCell>
                  <CTableDataCell>Niên khóa: {thongTin.NIENKHOA}</CTableDataCell>
                  <CTableDataCell>Học kỳ: {thongTin.HOCKY}</CTableDataCell>
                  <CTableDataCell>Nhóm: {thongTin.NHOM}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">Môn thi:</CTableHeaderCell>
                  <CTableDataCell >{thongTin.TENMH}</CTableDataCell>
                  <CTableDataCell colSpan="2">Trình độ đăng ký thi: {thongTin.TRINHDODK}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">Ngày thi:</CTableHeaderCell>
                  <CTableDataCell colSpan="3">{_formatDate(thongTin.NGAYTHI)}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">Thời gian thi:</CTableHeaderCell>
                  <CTableDataCell colSpan="3">{thongTin.THOIGIANTHI} phút</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">Số câu thi:</CTableHeaderCell>
                  <CTableDataCell colSpan="3">{thongTin.SCT}</CTableDataCell>
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
