import { cilDelete, cilPenAlt } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CCard, CCardBody, CCardHeader, CCol, CLink, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CTooltip } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import khoaApi from 'src/api/khoaApi';
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
  const pageRedirect = '/khoa/ds-khoa';

  const [idCanXoa, setIdCanXoa] = useState('');

  useEffect(() => {
    const fetchDS = async () => {
      try {
        const response = await khoaApi.getAll();
        setDS(response);
        console.log(response, response.status);
      } catch (error) {
        console.log(error);
      }
    }

    fetchDS();
  }, [reload])

  const handleClickXoa = (id) => {
    setVisibleCheck(!visibleCheck);
    setMessCheck(`khoa có mã là ${id}`);
    setIdCanXoa(id);
  }

  const handleClickAccept = () => {
    console.log(idCanXoa);
    setVisibleCheck(false);

    khoaApi.deleteOne(idCanXoa)
      .then(response => {
        console.log(response);
        if (response.result === 0) {
          throw Error('không xóa được!');
        }

        setVisible(!visible);
        setIsSuccess(true);
        setReload(!reload);
        setMess('Xóa khoa thành công!')
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
    <div className="row">
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Danh sách khoa</strong>
        </CCardHeader>
        <CCardBody>
          <CTable striped hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Mã khoa</CTableHeaderCell>
                <CTableHeaderCell scope="col">Tên khoa</CTableHeaderCell>
                <CTableHeaderCell scope="col">Chức năng</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {ds && (ds.map((khoa, idx) => (
                <CTableRow key={khoa.MAKH}>
                  <CTableHeaderCell scope="row">{idx + 1}</CTableHeaderCell>
                  <CTableDataCell>{khoa.MAKH}</CTableDataCell>
                  <CTableDataCell>{khoa.TENKH}</CTableDataCell>
                  <CTableDataCell>
                    <CTooltip content="Sửa" placement="left">
                      <Link to={`/khoa/sua-khoa/${khoa.MAKH}`}>
                        <CIcon icon={cilPenAlt} size='lg' />
                      </Link>
                    </CTooltip>
                    <span>   </span>
                    <CTooltip content="Xóa" placement="right" className='me-3'>
                      <CIcon onClick={() => handleClickXoa(khoa.MAKH)}
                        icon={cilDelete} size='lg' />
                    </CTooltip>
                  </CTableDataCell>
                </CTableRow>
              )))}
              {ds.length === 0 &&
                <CTableRow >
                  <CTableHeaderCell colSpan="4">Không có dữ liệu!</CTableHeaderCell>
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
    </div>
  )
}
