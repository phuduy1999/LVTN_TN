import { CCard, CCardBody, CCardHeader, CCol, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CTooltip } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import giaoVienApi from 'src/api/giaoVienApi';
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
  const pageRedirect = '/giaovien/ds-giaovien';

  const [idCanXoa, setIdCanXoa] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await giaoVienApi.getAll();
        setDS(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [reload])

  const handleClickXoa = (id) => {
    giaoVienApi.checkFK(id)
      .then(response => {
        const current = ds.find(kh => kh.MAGV === id);
        setVisibleCheck(!visibleCheck);
        setMessCheck(`xóa giáo viên ${current.HO} ${current.TEN}, có mã giáo viên là ${id}`);
        setIdCanXoa(id);
      })
      .catch(error => {
        setVisible(!visible);
        setIsSuccess(false);
        setMess('Lỗi: ' + error)
      })
  }

  const handleClickAccept = () => {
    console.log(idCanXoa);
    setVisibleCheck(false);

    giaoVienApi.deleteOne(idCanXoa)
      .then(response => {
        console.log(response);
        if (response.result === 0) {
          throw Error('không xóa được!');
        }

        setVisible(!visible);
        setIsSuccess(true);
        setReload(!reload);
        setMess('Xóa giáo viên thành công!')
      })
      .catch(error => {
        console.log(error.response);

        setVisible(!visible);
        setIsSuccess(false);
        setMess('Lỗi: ' + error.response.data.err)
      })
  }

  return (
    <CRow>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Danh sách giáo viên</strong>
        </CCardHeader>
        <CCardBody>
          <CTable striped hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Mã giáo viên</CTableHeaderCell>
                <CTableHeaderCell scope="col">Họ</CTableHeaderCell>
                <CTableHeaderCell scope="col">Tên</CTableHeaderCell>
                <CTableHeaderCell scope="col">Địa chỉ</CTableHeaderCell>
                <CTableHeaderCell scope="col">Số điện thoại</CTableHeaderCell>
                <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                <CTableHeaderCell scope="col">Khoa</CTableHeaderCell>
                <CTableHeaderCell scope="col">Chức năng</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {ds && (ds.map((gv, idx) => (
                <CTableRow key={gv.MAGV}>
                  <CTableHeaderCell scope="row">{idx + 1}</CTableHeaderCell>
                  <CTableDataCell>{gv.MAGV}</CTableDataCell>
                  <CTableDataCell>{gv.HO}</CTableDataCell>
                  <CTableDataCell>{gv.TEN}</CTableDataCell>
                  <CTableDataCell>{gv.DIACHI}</CTableDataCell>
                  <CTableDataCell>{gv.SDT}</CTableDataCell>
                  <CTableDataCell>{gv.EMAIL}</CTableDataCell>
                  <CTableDataCell>{gv.TENKH}</CTableDataCell>
                  <CTableDataCell>
                    <CTooltip content="Sửa" placement="left">
                      <Link to={`/giaovien/sua-giaovien/${gv.MAGV}`}>
                        <CIcon icon={cilPenAlt} size='lg' />
                      </Link>
                    </CTooltip>
                    <span>   </span>
                    {gv.MAGV.trim() !== InfoUserLogin()?.MAGV &&
                      <CTooltip content="Xóa" placement="right" className='me-3'>
                        <CIcon onClick={() => handleClickXoa(gv.MAGV)}
                          icon={cilDelete} size='lg' />
                      </CTooltip>
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
      <AppModalCustom visible={visible} handleSetVisible={() => { setVisible(false) }}
        mess={mess} isSuccess={isSuccess} pageRedirect={pageRedirect} />
      <AppModalCustomDelete visibleCheck={visibleCheck}
        handleSetVisibleCheck={() => { setVisibleCheck(false) }}
        mess={messCheck} handleClickAccept={handleClickAccept} />
    </CRow>
  )
}
