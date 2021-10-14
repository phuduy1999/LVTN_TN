import {
  CCol,
  CContainer, CRow
} from '@coreui/react'
import React from 'react'

const PageWelcome = () => {
  return (
    <div className="bg-light min-vh-100 d-flex flex-row">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={5}>
            <div className="clearfix">
              <h1 className="float-start display-3 me-4">Welcome back!</h1>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default PageWelcome
