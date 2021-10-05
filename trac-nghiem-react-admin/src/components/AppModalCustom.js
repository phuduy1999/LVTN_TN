import { cilCheckCircle, cilXCircle } from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import { CButton, CModal, CModalBody, CModalFooter, CModalHeader, CModalTitle } from '@coreui/react';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default function AppModalCustom(props) {
  const { visible, handleSetVisible, mess, isSuccess, pageRedirect } = props
  const history = useHistory();

  return (
    <CModal visible={visible}>
      <CModalHeader >
        <CModalTitle>Thông báo  </CModalTitle>
        <span className='me-2'></span>
        {isSuccess && <span className="text-success"><CIcon icon={cilCheckCircle} size='xxl' /></span>}
        {!isSuccess && <span className="text-danger"><CIcon icon={cilXCircle} size='xxl' /></span>}
      </CModalHeader>
      <CModalBody>
        {mess}
      </CModalBody>
      <CModalFooter>
        <CButton color="info" onClick={() => {
          handleSetVisible();
          if (isSuccess) {
            history.push(pageRedirect);
          }
        }}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
