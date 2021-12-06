import { cilDelete, cilPenAlt, cilPrint } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CCard, CCardBody, CCardHeader, CCol, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CTooltip } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import dangKyApi from 'src/api/dangKyApi';
import AppModalCustom from 'src/components/AppModalCustom';
import AppModalCustomDelete from 'src/components/AppModalCustomDelete';
import _formatDate from 'src/_formatDate';
import InfoUserLogin from 'src/_infoUser';

export default function index() {
  const [ds, setDS] = useState([]);
  const [visible, setVisible] = useState(false)
  const [visibleCheck, setVisibleCheck] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [reload, setReload] = useState(false)
  const [mess, setMess] = useState('')
  const [messCheck, setMessCheck] = useState('')
  const pageRedirect = '/dangky/ds-dangky';
  const history = useHistory();

  const [idCanXoa, setIdCanXoa] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dangKyApi.getAll();
        setDS(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [reload])

  const handleClickXoa = (id) => {
    dangKyApi.checkFK(id)
      .then(response => {
        const lmhCurrent = ds.find(lmh => lmh.IDLMH === id);
        setVisibleCheck(!visibleCheck);
        setMessCheck(`hủy đăng ký thi cho lớp môn học ${lmhCurrent.TENMH} nhóm ${lmhCurrent.NHOM} thuộc học kỳ ${lmhCurrent.HOCKY} của niên khóa ${lmhCurrent.NIENKHOA}`);
        setIdCanXoa(id);
      })
      .catch(error => {
        setVisible(!visible);
        setIsSuccess(false);
        setMess('Lỗi: ' + error.response.data.err)
      })
  }

  const handleClickAccept = () => {
    console.log(idCanXoa);
    setVisibleCheck(false);

    dangKyApi.deleteOne(idCanXoa)
      .then(response => {
        console.log(response);
        if (response.result === 0) {
          throw Error('không xóa được!');
        }

        setVisible(!visible);
        setIsSuccess(true);
        setReload(!reload);
        setMess('Hủy đăng ký thi thành công!')
      })
      .catch(error => {
        console.log(error.response);

        setVisible(!visible);
        setIsSuccess(false);
        setMess('Lỗi: ' + error.response.data.err)
      })
  }

  const handleClickLinkSua = (e, pathname, id) => {
    e.preventDefault();
    dangKyApi.checkBeforeEdit(id)
      .then(response => {
        history.push(pathname);
      })
      .catch(error => {
        setVisible(!visible);
        setIsSuccess(false);
        setMess('Lỗi: ' + error.response.data.err);
      })
  }

  return (
    <div >
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Danh sách đăng ký thi</strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Niên khóa</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Học kỳ</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nhóm</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Môn học</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Giáo viên đăng ký</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Trình độ đăng ký</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ngày thi</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Số câu thi</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Thời gian thi (phút)</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Chức năng</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {ds && (ds.map((dk, idx) => (
                  <CTableRow key={dk.IDLMH}>
                    <CTableHeaderCell scope="row">{idx + 1}</CTableHeaderCell>
                    <CTableDataCell>{dk.NIENKHOA}</CTableDataCell>
                    <CTableDataCell>{dk.HOCKY}</CTableDataCell>
                    <CTableDataCell>{dk.NHOM}</CTableDataCell>
                    <CTableDataCell>{dk.TENMH}</CTableDataCell>
                    <CTableDataCell>{dk.HO + " " + dk.TEN}</CTableDataCell>
                    <CTableDataCell>{dk.TRINHDODK}</CTableDataCell>
                    <CTableDataCell>{_formatDate(dk.NGAYTHI, false)}</CTableDataCell>
                    <CTableDataCell>{dk.SCT}</CTableDataCell>
                    <CTableDataCell>{dk.THOIGIANTHI}</CTableDataCell>
                    <CTableDataCell>
                      <CTooltip content="Danh sách ký tên" placement="left" className='me-3'>
                        <Link to={`/report/ds-kyten/${dk.IDLMH}`} target='_blank'>
                          <CIcon icon={cilPrint} size='lg' />
                        </Link>
                      </CTooltip>
                      <span>   </span>
                      {dk.MAGVDK.trim() === InfoUserLogin()?.MAGV &&
                        <span>
                          <CTooltip content="Sửa" placement="top">
                            <Link
                              to={`/dangky/sua-dangky/${dk.IDLMH}`}
                              onClick={(e) => handleClickLinkSua(e, `/dangky/sua-dangky/${dk.IDLMH}`, dk.IDLMH)}
                            >
                              <CIcon icon={cilPenAlt} size='lg' />
                            </Link>
                          </CTooltip>
                          <span>   </span>
                          <CTooltip content="Hủy đăng ký" placement="right" className='me-3'>
                            <CIcon onClick={() => handleClickXoa(dk.IDLMH)}
                              icon={cilDelete} size='lg' />
                          </CTooltip>
                        </span>
                      }
                    </CTableDataCell>
                  </CTableRow>
                )))}
                {ds.length === 0 &&
                  <CTableRow >
                    <CTableHeaderCell colSpan="11">Không có dữ liệu!</CTableHeaderCell>
                  </CTableRow>
                }
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
        <AppModalCustom visible={visible} handleSetVisible={() => { setVisible(false) }}
          mess={mess} isSuccess={isSuccess} pageRedirect={pageRedirect} />
        <AppModalCustomDelete visibleCheck={visibleCheck}
          handleSetVisibleCheck={() => { setVisibleCheck(false) }}
          mess={messCheck} handleClickAccept={handleClickAccept} />
      </CCol>
    </div>
  )
}
