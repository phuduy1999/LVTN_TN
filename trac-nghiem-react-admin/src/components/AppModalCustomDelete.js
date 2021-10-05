import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import React from 'react';

export default function AppModalCustom(props) {
  const { visibleCheck, handleSetVisibleCheck, mess, handleClickAccept } = props

  return (
    <CModal visible={visibleCheck}>
      <CModalHeader onDismiss={() => handleSetVisibleCheck()}>
        <CModalTitle>Thông báo</CModalTitle>
      </CModalHeader>
      <CModalBody>
        Bạn có đồng ý xóa {mess} ?
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => handleSetVisibleCheck()}>
          Không
        </CButton>
        <CButton color="primary" onClick={() => handleClickAccept()}>Đồng ý</CButton>
      </CModalFooter>
    </CModal>
  )
}
