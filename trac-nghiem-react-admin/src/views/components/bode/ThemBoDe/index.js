import { CAccordion, CAccordionBody, CAccordionHeader, CAccordionItem, CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput, CFormLabel, CInputGroup } from '@coreui/react';
import React, { useState } from 'react';
import FormNhapBoDe2 from './FormNhapBoDe2';
import FormNhapTuExcel from './FormNhapTuExcel';
import AppModalCustom from 'src/components/AppModalCustom';

export default function index() {
  const [visible, setVisible] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [mess, setMess] = useState(false)
  const pageRedirect = '/bode/ds-bode';

  const handleSetVisible = () => {
    setVisible(false);
  }

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Thêm mới câu hỏi thi</strong>
        </CCardHeader>
        <CCardBody>
          <CAccordion flush>
            <CAccordionItem itemKey={1}>
              <CAccordionHeader>
                #1 Nhập trực tiếp từ trang web
              </CAccordionHeader>
              <CAccordionBody>
                <FormNhapBoDe2
                  setVisible={setVisible}
                  setIsSuccess={setIsSuccess}
                  setMess={setMess}
                />
              </CAccordionBody>
            </CAccordionItem>
            <CAccordionItem itemKey={2}>
              <CAccordionHeader>
                #2 Import các câu hỏi thi từ file Excel
              </CAccordionHeader>
              <CAccordionBody>
                <FormNhapTuExcel
                  setVisible={setVisible}
                  setIsSuccess={setIsSuccess}
                  setMess={setMess}
                />
              </CAccordionBody>
            </CAccordionItem>
          </CAccordion>
        </CCardBody>
      </CCard>
      <AppModalCustom visible={visible} handleSetVisible={handleSetVisible}
        mess={mess} isSuccess={isSuccess} pageRedirect={pageRedirect} />
    </CCol >
  )
}
