import { CCard, CCardBody, CCardHeader, CCol, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CTooltip } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import boDeApi from 'src/api/boDeApi';
import { Link } from "react-router-dom";
import { cilDelete, cilPenAlt } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import AppModalCustom from 'src/components/AppModalCustom';
import AppModalCustomDelete from 'src/components/AppModalCustomDelete';
import InfoUserLogin from 'src/_infoUser';

export default function index() {
  const [ds, setDS] = useState([]);
  const [visible, setVisible] = useState(false)
  const [visibleCheck, setVisibleCheck] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [reload, setReload] = useState(false)
  const [mess, setMess] = useState('')
  const [messCheck, setMessCheck] = useState('')
  const pageRedirect = '/bode/ds-bode';

  const [idCanXoa, setIdCanXoa] = useState('');

  useEffect(() => {
    const fetchDS = async () => {
      try {
        const response = await boDeApi.getAll();
        setDS(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchDS();
  }, [reload])

  const handleClickXoa = (id) => {
    setVisibleCheck(!visibleCheck);
    setMessCheck(`xóa câu hỏi thi có id là ${id}`);
    setIdCanXoa(id);
  }

  const handleClickAccept = () => {
    console.log(idCanXoa);
    setVisibleCheck(false);

    boDeApi.deleteOne(idCanXoa)
      .then(response => {
        console.log(response);
        if (response.result === 0) {
          throw Error('không xóa được!');
        }

        setVisible(!visible);
        setIsSuccess(true);
        setReload(!reload);
        setMess('Xóa câu hỏi thi thành công!')
      })
      .catch(error => {
        console.log(error.response);

        setVisible(!visible);
        setIsSuccess(false);
        setMess('Lỗi: ' + error.response.data.err)
      })
  }

  const handleSetVisible = () => {
    setVisible(false);
  }

  const handleSetVisibleCheck = () => {
    setVisibleCheck(false);
  }

  return (
    <div >
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Danh sách câu hỏi thi</strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">ID câu hỏi</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Trình độ</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nội dung</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Đáp án</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Môn học</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Loại câu hỏi</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Giáo viên</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Chức năng</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {ds && (ds.map((ch, idx) => (
                  <CTableRow key={ch.IDCAUHOI}>
                    <CTableHeaderCell scope="row">{idx + 1}</CTableHeaderCell>
                    <CTableDataCell>{ch.IDCAUHOI}</CTableDataCell>
                    <CTableDataCell>{ch.TRINHDO}</CTableDataCell>
                    <CTableDataCell>{ch.NOIDUNG.slice(0, 40) + "..."}</CTableDataCell>
                    <CTableDataCell>{ch.DAP_AN}</CTableDataCell>
                    <CTableDataCell>{ch.TENMH}</CTableDataCell>
                    <CTableDataCell>{ch.TENLOAICH}</CTableDataCell>
                    <CTableDataCell>{ch.HO + " " + ch.TEN}</CTableDataCell>
                    <CTableDataCell>
                      {ch.MAGV.trim() === InfoUserLogin()?.MAGV &&
                        <span>
                          <CTooltip content="Sửa" placement="left">
                            <Link to={`/bode/sua-bode/${ch.IDCAUHOI}`}>
                              <CIcon icon={cilPenAlt} size='lg' />
                            </Link>
                          </CTooltip>
                          <span>   </span>
                          <CTooltip content="Xóa" placement="right" className='me-3'>
                            <CIcon onClick={() => handleClickXoa(ch.IDCAUHOI)}
                              icon={cilDelete} size='lg' />
                          </CTooltip>
                        </ span>
                      }
                    </CTableDataCell>
                  </CTableRow>
                )))}
                {ds.length === 0 &&
                  <CTableRow >
                    <CTableHeaderCell colSpan="9">Không có dữ liệu!</CTableHeaderCell>
                  </CTableRow>
                }
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
        <AppModalCustom visible={visible} handleSetVisible={handleSetVisible}
          mess={mess} isSuccess={isSuccess} pageRedirect={pageRedirect} />
        <AppModalCustomDelete visibleCheck={visibleCheck}
          handleSetVisibleCheck={handleSetVisibleCheck}
          mess={messCheck} handleClickAccept={handleClickAccept} />
      </CCol>
    </div>
  )
}
