import { cilArrowLeft, cilDelete, cilHistory, cilList } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CTooltip } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import lopMHApi from 'src/api/lopMHApi';
import AppModalCustom from 'src/components/AppModalCustom';
import AppModalCustomDelete from 'src/components/AppModalCustomDelete';
import InfoUserLogin from 'src/_infoUser';

export default function index() {
  const [ds, setDS] = useState([]);
  const [visible, setVisible] = useState(false)
  const [visibleCheck, setVisibleCheck] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isDelete, setIsDelete] = useState(true)
  const [reload, setReload] = useState(false)
  const [mess, setMess] = useState('')
  const [messCheck, setMessCheck] = useState('')
  const pageRedirect = '/lopmonhoc/ds-lopmonhoc-dahuy';

  const [idCanXoa, setIdCanXoa] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await lopMHApi.getAllCancel();
        setDS(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [reload])

  const handleClickXoa = (id) => {
    lopMHApi.checkFK(id)
      .then(response => {
        setVisibleCheck(!visibleCheck);
        setMessCheck(`xóa lớp môn học có id là ${id}`);
        setIdCanXoa(id);
        setIsDelete(true);
      })
      .catch(error => {
        setVisible(!visible);
        setIsSuccess(false);
        setMess('Lỗi: ' + error.response.data.err)
      })
  }

  const handleClickKhoiPhuc = (id) => {
    setVisibleCheck(!visibleCheck);
    setMessCheck(`khôi phục lớp môn học có id là ${id}`);
    setIdCanXoa(id);
    setIsDelete(false);
  }

  const handleClickAccept = () => {
    console.log(idCanXoa);
    setVisibleCheck(false);

    if (isDelete) {
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
    else {
      lopMHApi.restoreOne(idCanXoa)
        .then(response => {
          console.log(response);
          if (response.result === 0) {
            throw Error('không khôi phục được!');
          }

          setVisible(!visible);
          setIsSuccess(true);
          setReload(!reload);
          setMess('Khôi phục lớp môn học thành công!')
        })
        .catch(error => {
          console.log(error.response);

          setVisible(!visible);
          setIsSuccess(false);
          setMess('Lỗi: ' + error.response.data.err)
        })
    }
  }

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Danh sách lớp môn học đã hủy</strong>
        </CCardHeader>
        <CCardBody>
          <CCol xs={12} className="text-start">
            <Link to="/lopmonhoc/ds-lopmonhoc" >
              <CIcon icon={cilArrowLeft} />
              <span>   Quay lại</span>
            </Link>
          </CCol>
          <CTable striped hover className="mt-3">
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
                    {InfoUserLogin()?.MANQ === 'PGV' &&
                      <span>
                        <CTooltip content="Xóa" placement="top" className='me-3'>
                          <CIcon onClick={() => handleClickXoa(lmh.IDLMH)}
                            icon={cilDelete} size='lg' />
                        </CTooltip>
                        <span>   </span>
                        <CTooltip content="Khôi phục" placement="right" className='me-3'>
                          <CIcon onClick={() => handleClickKhoiPhuc(lmh.IDLMH)}
                            icon={cilHistory} size='lg' />
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
          <div className="d-grid gap-2 col-2 mx-auto mt-4">
            <Link to={`/report/lopmonhoc/0`} target='_blank'>
              <CTooltip content="Danh sách lớp môn học đã hủy" placement="right" className='me-3'>
                <CButton color="secondary" variant="outline">
                  In danh sách
                </CButton>
              </CTooltip>
            </Link>
          </div>
        </CCardBody>
      </CCard>
      <AppModalCustom visible={visible} handleSetVisible={() => { setVisible(false) }}
        mess={mess} isSuccess={isSuccess} pageRedirect={pageRedirect} />
      <AppModalCustomDelete visibleCheck={visibleCheck}
        handleSetVisibleCheck={() => { setVisibleCheck(false) }}
        mess={messCheck} handleClickAccept={handleClickAccept} />
    </CCol>
  )
}
