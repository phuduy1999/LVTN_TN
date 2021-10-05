import { cibEyeem, cilDelete, cilEyedropper, cilList, cilPenAlt } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CCard, CCardBody, CCardHeader, CCol, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CTooltip } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import lopMHApi from 'src/api/lopMHApi';
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
  const pageRedirect = '/lopmonhoc/ds-lopmonhoc';

  const [idCanXoa, setIdCanXoa] = useState('');

  useEffect(() => {
    const fetchDS = async () => {
      try {
        const response = await lopMHApi.getAll();
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
    setMessCheck(`lớp môn học có id là ${id}`);
    setIdCanXoa(id);
  }

  const handleClickAccept = () => {
    console.log(idCanXoa);
    setVisibleCheck(false);

    lopMHApi.deleteOne(idCanXoa)
      .then(response => {
        console.log(response);
        if (response.result === 0) {
          throw Error('không xóa được!');
        }

        setVisible(!visible);
        setIsSuccess(true);
        setReload(!reload);
        setMess('Xóa lớp môn học thành công!')
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
            <strong>Danh sách lớp môn học</strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">ID</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Niên khóa</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Học kỳ</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Nhóm</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Số sinh viên tối thiểu</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Khoa</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Môn học</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Giáo viên</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Chức năng</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {ds && (ds.map((lmh, idx) => (
                  <CTableRow key={lmh.IDLMH}>
                    <CTableHeaderCell scope="row">{idx + 1}</CTableHeaderCell>
                    <CTableDataCell>{lmh.IDLMH}</CTableDataCell>
                    <CTableDataCell>{lmh.NIENKHOA}</CTableDataCell>
                    <CTableDataCell>{lmh.HOCKY}</CTableDataCell>
                    <CTableDataCell>{lmh.NHOM}</CTableDataCell>
                    <CTableDataCell>{lmh.SOSVTT}</CTableDataCell>
                    <CTableDataCell>{lmh.TENKH}</CTableDataCell>
                    <CTableDataCell>{lmh.TENMH}</CTableDataCell>
                    <CTableDataCell>{lmh.HO + " " + lmh.TEN}</CTableDataCell>
                    <CTableDataCell>
                      <CTooltip content="Danh sách sinh viên đăng ký" placement="left" className='me-3'>
                        <Link to={`/lopmonhoc/ds-sinhvien/${lmh.IDLMH}`}>
                          <CIcon icon={cilList} size='lg' />
                        </Link>
                      </CTooltip>
                      <span>   </span>
                      {localStorage.getItem('MANQ') === 'PGV' &&
                        <span>
                          <CTooltip content="Sửa" placement="top" className='me-3'>
                            <Link to={`/lopmonhoc/sua-lopmonhoc/${lmh.IDLMH}`}>
                              <CIcon icon={cilPenAlt} size='lg' />
                            </Link>
                          </CTooltip>
                          <span>   </span>
                          <CTooltip content="Xóa" placement="right" className='me-3'>
                            <CIcon onClick={() => handleClickXoa(lmh.IDLMH)}
                              icon={cilDelete} size='lg' />
                          </CTooltip>
                        </span>
                      }
                    </CTableDataCell>
                  </CTableRow>
                )))}
                {ds.length === 0 &&
                  <CTableRow >
                    <CTableHeaderCell colSpan="10">Không có dữ liệu!</CTableHeaderCell>
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
    </div >
  )
}
