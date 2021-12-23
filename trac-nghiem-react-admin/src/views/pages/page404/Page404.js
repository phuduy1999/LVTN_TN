import {
  CCol,
  CContainer, CRow
} from '@coreui/react'
import React from 'react'

const Page404 = () => {
  return (
    <CContainer>
      <CRow className="justify-content-center">
        <CCol md={5}>
          <div className="clearfix">
            <h1 className="float-start display-3 me-4">404</h1>
            <h4 className="pt-3">Oops! You{"'"}re lost.</h4>
            <p className="text-medium-emphasis float-start">
              The page you are looking for was not found.
            </p>
          </div>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Page404
