import { CBadge, CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHeaderCell, CTableRow } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-scroll';
import dangKyApi from 'src/api/dangKyApi';
import lichSuThiApi from 'src/api/lichSuThiApi';
import sinhVienApi from 'src/api/sinhVienApi';
import CauHoiDK from '../../cauhoi/DienKhuyet';
import CauHoiNLC from '../../cauhoi/NhieuLuaChon';

export default function index() {
  const { id, diem } = useParams();

  const isDisabled = true;
  const [thongTin, setThongTin] = useState([]);
  const [dsch, setDSCH] = useState([]);
  const [sv, setSV] = useState({});
  const [dslc, setDSLC] = useState([]);
  const [dsda, setDSDA] = useState([]);

  useEffect(() => {
    const fetchDS = async () => {
      try {
        const response = await dangKyApi.getOne(id);
        setThongTin(response);
        const user = JSON.parse(localStorage.getItem('user'));
        const response2 = await sinhVienApi.getOneByEmail(user.EMAIL);
        setSV(response2);
        const response1 = await lichSuThiApi.getQuestionsHistory({
          IDLMH: id,
          MASV: user.MASV,
        });
        setDSCH(response1);
        console.log(response, response1, response2);
        let ds_luaChon = [];
        let ds_dapAn = [];
        for (let i = 0; i < response1.length; i++) {
          ds_luaChon.push(response1[i].LUACHONSV);
          ds_dapAn.push(response1[i].DAP_AN);
        }
        setDSLC(ds_luaChon);
        setDSDA(ds_dapAn);
        console.log(ds_luaChon, ds_dapAn);
      } catch (error) {
        console.log(error);
      }
    }

    fetchDS();
  }, [])

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
                  <CTableDataCell>Ngày sinh: {sv.NGAYSINH && sv.NGAYSINH.slice(8, 10) + "/" +
                    sv.NGAYSINH.slice(5, 7) + "/" + sv.NGAYSINH.slice(0, 4)}</CTableDataCell>
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
                  <CTableDataCell colSpan="3">{thongTin.NGAYTHI && thongTin.NGAYTHI.slice(8, 10) + "/" +
                    thongTin.NGAYTHI.slice(5, 7) + "/" + thongTin.NGAYTHI.slice(0, 4)}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">Thời gian thi:</CTableHeaderCell>
                  <CTableDataCell colSpan="3">{thongTin.THOIGIANTHI} phút</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">Số câu thi:</CTableHeaderCell>
                  <CTableDataCell colSpan="3">{thongTin.SCT}</CTableDataCell>
                </CTableRow>
                <CTableRow>
                  <CTableHeaderCell scope="row">Điểm thi:</CTableHeaderCell>
                  <CTableDataCell colSpan="3">
                    <h5><CBadge color="success">{diem}</CBadge></h5>
                  </CTableDataCell>
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
                  return <CauHoiNLC isDisabled={isDisabled} key={'cau' + (idx + 1)} cauhoi={ch} idx={idx} />;
                }
                else return <CauHoiDK isDisabled={isDisabled} key={'cau' + (idx + 1)} cauhoi={ch} idx={idx} />;
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
                      {dslc[idx] !== dsda[idx] &&
                        <span className="text-danger mt-3">
                          {((idx + 1) < 10 ? '0' + (idx + 1) : (idx + 1)) + ": " + (ch.MALOAICH.trim() === "NLC" ? dslc[idx] : '')}
                          {dslc[idx] !== '' && <span>{ch.MALOAICH.trim() === 'DK' ? <span>&#10003;</span> : ''}</span>}
                        </span>}
                      {dslc[idx] === dsda[idx] &&
                        <span className="text-success mt-3">
                          {((idx + 1) < 10 ? '0' + (idx + 1) : (idx + 1)) + ": " + (ch.MALOAICH.trim() === "NLC" ? dslc[idx] : '')}
                          {dslc[idx] !== '' && <span>{ch.MALOAICH.trim() === 'DK' ? <span>&#10003;</span> : ''}</span>}
                        </span>}

                    </Link>
                  </CCol>
                ))
              }
            </CRow>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow >
  )
}
