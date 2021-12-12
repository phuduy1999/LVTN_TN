import {
  CCol,
  CContainer, CRow
} from '@coreui/react'
import React from 'react'

const PageWelcome = () => {
  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md={5}>
          <div className="clearfix">
            <h1 className="float-start display-3 me-4">Welcome back!</h1>
          </div>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default PageWelcome
