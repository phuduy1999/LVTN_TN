import { CCard, CCardBody, CCardHeader, CCol, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CTooltip } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import dangKyApi from 'src/api/dangKyApi';
import { Link } from "react-router-dom";
import { cilDelete, cilPenAlt } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
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
  const pageRedirect = '/dangky/ds-dangky';

  const [idCanXoa, setIdCanXoa] = useState('');

  useEffect(() => {
    const fetchDS = async () => {
      try {
        const response = await dangKyApi.getAll();
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
    setMessCheck(`đăng ký có id là ${id} (hủy đăng ký)`);
    setIdCanXoa(id);
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
                    <CTableDataCell>{dk.NGAYTHI.slice(8, 10) + "/" +
                      dk.NGAYTHI.slice(5, 7) + "/" + dk.NGAYTHI.slice(0, 4)}</CTableDataCell>
                    <CTableDataCell>{dk.SCT}</CTableDataCell>
                    <CTableDataCell>{dk.THOIGIANTHI}</CTableDataCell>
                    <CTableDataCell>
                      {dk.MAGVDK.trim() === localStorage.getItem('MAGV') &&
                        <span>
                          <CTooltip content="Sửa" placement="left">
                            <Link to={`/dangky/sua-dangky/${dk.IDLMH}`}>
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
        <AppModalCustom visible={visible} handleSetVisible={handleSetVisible}
          mess={mess} isSuccess={isSuccess} pageRedirect={pageRedirect} />
        <AppModalCustomDelete visibleCheck={visibleCheck}
          handleSetVisibleCheck={handleSetVisibleCheck}
          mess={messCheck} handleClickAccept={handleClickAccept} />
      </CCol>
    </div>
  )
}
