import { CCard, CCardBody, CCardHeader, CCol, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import React, { useEffect, useState } from 'react'
import loaiCHApi from 'src/api/loaiCHApi';

export default function index() {
  const [ds, setDS] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await loaiCHApi.getAll();
        setDS(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])

  return (
    <div >
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Danh sách loại câu hỏi</strong>
          </CCardHeader>
          <CCardBody>
            <CTable striped hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Mã loại câu hỏi</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tên loại câu hỏi</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {ds && (ds.map((lch, idx) => (
                  <CTableRow key={lch.MALOAICH}>
                    <CTableHeaderCell scope="row">{idx + 1}</CTableHeaderCell>
                    <CTableDataCell>{lch.MALOAICH}</CTableDataCell>
                    <CTableDataCell>{lch.TENLOAICH}</CTableDataCell>
                  </CTableRow>
                )))}
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </div>
  )
}
