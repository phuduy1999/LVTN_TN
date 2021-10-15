import { cibAddthis, cilDelete, cilNoteAdd, cilPenAlt } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CCard, CCardBody, CCardHeader, CCol, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CTooltip } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import sinhVienApi from 'src/api/sinhVienApi';
import { Link } from "react-router-dom";
import AppModalCustom from 'src/components/AppModalCustom';
import AppModalCustomDelete from 'src/components/AppModalCustomDelete';
import _formatDate from 'src/_formatDate';

export default function index() {
  const [ds, setDS] = useState([]);
  const [visible, setVisible] = useState(false)
  const [visibleCheck, setVisibleCheck] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [reload, setReload] = useState(false)
  const [mess, setMess] = useState('')
  const [messCheck, setMessCheck] = useState('')
  const pageRedirect = '/sinhvien/ds-sinhvien';

  const [idCanXoa, setIdCanXoa] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sinhVienApi.getAll();
        setDS(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [reload])

  const handleClickXoa = (id) => {
    setVisibleCheck(!visibleCheck);
    setMessCheck(`xóa sinh viên có mã là ${id}`);
    setIdCanXoa(id);
  }

  const handleClickAccept = () => {
    console.log(idCanXoa);
    setVisibleCheck(false);

    sinhVienApi.deleteOne(idCanXoa)
      .then(response => {
        console.log(response);
        if (response.result === 0) {
          throw Error('không xóa được!');
        }

        setVisible(!visible);
        setIsSuccess(true);
        setReload(!reload);
        setMess('Xóa sinh viên thành công!')
      })
      .catch(error => {
        console.log(error.response);

        setVisible(!visible);
        setIsSuccess(false);
        setMess('Lỗi: ' + error.response.data.err)
      })
  }

  return (
    <div >
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Danh sách sinh viên</strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Mã sinh viên</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Họ</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tên</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ngày sinh</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Địa chỉ</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Chức năng</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {ds && (ds.map((sv, idx) => (
                  <CTableRow key={sv.MASV}>
                    <CTableHeaderCell scope="row">{idx + 1}</CTableHeaderCell>
                    <CTableDataCell>{sv.MASV}</CTableDataCell>
                    <CTableDataCell>{sv.HO}</CTableDataCell>
                    <CTableDataCell>{sv.TEN}</CTableDataCell>
                    <CTableDataCell>{_formatDate(sv.NGAYSINH, false)}</CTableDataCell>
                    <CTableDataCell>{sv.DIACHI}</CTableDataCell>
                    <CTableDataCell>{sv.EMAIL}</CTableDataCell>
                    <CTableDataCell>
                      <CTooltip content="Sửa" placement="left">
                        <Link to={`/sinhvien/sua-sinhvien/${sv.MASV.trim()}`}>
                          <CIcon icon={cilPenAlt} size='lg' />
                        </Link>
                      </CTooltip>
                      <span>   </span>
                      <CTooltip content="Xóa" placement="right" className='me-3'>
                        <CIcon onClick={() => handleClickXoa(sv.MASV)}
                          icon={cilDelete} size='lg' />
                      </CTooltip>
                    </CTableDataCell>
                  </CTableRow>
                )))}

                {ds.length === 0 &&
                  <CTableRow >
                    <CTableHeaderCell colSpan="8">Không có dữ liệu!</CTableHeaderCell>
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
