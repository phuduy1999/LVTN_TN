import { cibAddthis, cilDelete, cilNoteAdd, cilPenAlt } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CCard, CCardBody, CCardHeader, CCol, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CTooltip } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import sinhVienApi from 'src/api/sinhVienApi';
import { Link } from "react-router-dom";
import AppModalCustom from 'src/components/AppModalCustom';
import AppModalCustomDelete from 'src/components/AppModalCustomDelete';

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
    const fetchDS = async () => {
      try {
        const response = await sinhVienApi.getAll();
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
    setMessCheck(`sinh viên có mã là ${id}`);
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
                    <CTableDataCell>{sv.NGAYSINH.slice(8, 10) + "/" +
                      sv.NGAYSINH.slice(5, 7) + "/" + sv.NGAYSINH.slice(0, 4)}</CTableDataCell>
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
        <AppModalCustom visible={visible} handleSetVisible={handleSetVisible}
          mess={mess} isSuccess={isSuccess} pageRedirect={pageRedirect} />
        <AppModalCustomDelete visibleCheck={visibleCheck}
          handleSetVisibleCheck={handleSetVisibleCheck}
          mess={messCheck} handleClickAccept={handleClickAccept} />
      </CCol>
    </div>
  )
}
