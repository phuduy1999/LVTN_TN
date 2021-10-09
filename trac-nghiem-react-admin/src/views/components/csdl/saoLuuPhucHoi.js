import { cilHistory } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CCard, CCardBody, CCardTitle, CCol, CContainer, CFormCheck, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CTooltip } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import csdlApi from 'src/api/csdlApi';
import AppModalCustom from 'src/components/AppModalCustom';
import AppModalCustomDelete from 'src/components/AppModalCustomDelete';
import _formatDate from 'src/_formatDate';

function saoLuuPhucHoi() {
  const [ds, setDS] = useState([]);
  const [visible, setVisible] = useState(false)
  const [visibleCheck, setVisibleCheck] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [isOverride, setIsOverride] = useState(false)
  const [reload, setReload] = useState(false)
  const [mess, setMess] = useState('')
  const [messCheck, setMessCheck] = useState('')
  const pageRedirect = '/csdl';

  const [position, setPosition] = useState('');

  useEffect(() => {
    const fetchDS = async () => {
      try {
        const response = await csdlApi.getList();
        setDS(response);
        console.log(response, response.status);
      } catch (error) {
        console.log(error);
      }
    }

    fetchDS();
  }, [reload])

  const handleClickPhucHoi = (po) => {
    setVisibleCheck(!visibleCheck);
    setMessCheck(`phục hồi database với bản sao lưu thứ ${po}`);
    setPosition(po);
  }

  const handleClickAccept = () => {
    console.log(position);
    setVisibleCheck(false);

    csdlApi.restore(position)
      .then(response => {
        console.log(response);

        setVisible(!visible);
        setIsSuccess(true);
        setReload(!reload);
        setMess('Phục hồi database thành công!')
      })
      .catch(error => {
        console.log(error.response);

        setVisible(!visible);
        setIsSuccess(false);
        setMess('Lỗi: ' + error.response.data.err)
      })
  }

  const handleClickSaoLuu = () => {
    csdlApi.backup({
      diengiai: '',
      ghide: isOverride ? 1 : 0,
    })
      .then(response => {
        console.log(response);

        setVisible(!visible);
        setIsSuccess(true);
        setReload(!reload);
        setMess('Sao lưu thành công!')
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
    <CContainer>
      <CCard>
        <CCardBody>
          <CCardTitle>Sao lưu và phục hồi Database</CCardTitle>
          <CRow className='mt-4'>
            <CCol md={2}>
              <CFormCheck
                id="flexCheckDefault"
                label="Tạo mới"
                onChange={(e) => setIsOverride(e.target.checked)}
              />
            </CCol>
            <CCol md={3}>
              <CButton onClick={() => handleClickSaoLuu()}
                color="primary"
              >
                Sao lưu
              </CButton>
            </CCol>
          </CRow>
          <CRow className='mt-4'>
            <CTable striped hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col" className='text-center'>Bản sao lưu thứ#</CTableHeaderCell>
                  <CTableHeaderCell scope="col" className='text-center'>Diễn giải</CTableHeaderCell>
                  <CTableHeaderCell scope="col" className='text-center'>Ngày giờ sao lưu</CTableHeaderCell>
                  <CTableHeaderCell scope="col" className='text-center'>Chức năng</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {ds && (ds.map((bk, idx) => (
                  <CTableRow key={bk.position}>
                    <CTableHeaderCell className='text-center'>{bk.position}</CTableHeaderCell>
                    <CTableDataCell className='text-center'>{bk.name}</CTableDataCell>
                    <CTableDataCell className='text-center'>
                      {_formatDate(bk.backup_start_date, true)}
                    </CTableDataCell>
                    <CTableDataCell className='text-center'>
                      <CTooltip content="Phục hồi" placement="right" className='me-3'>
                        <CIcon onClick={() => handleClickPhucHoi(bk.position)}
                          icon={cilHistory} size='lg' />
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
          </CRow>
        </CCardBody>
      </CCard>
      <AppModalCustom visible={visible} handleSetVisible={handleSetVisible}
        mess={mess} isSuccess={isSuccess} pageRedirect={pageRedirect} />
      <AppModalCustomDelete visibleCheck={visibleCheck}
        handleSetVisibleCheck={handleSetVisibleCheck}
        mess={messCheck} handleClickAccept={handleClickAccept} />
    </CContainer>
  )
}

export default saoLuuPhucHoi
