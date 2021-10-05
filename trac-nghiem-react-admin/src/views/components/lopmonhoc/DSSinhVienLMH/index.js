import { CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import sinhVienApi from 'src/api/sinhVienApi';
import monHocApi from 'src/api/monHocApi';
import lopMHApi from 'src/api/lopMHApi';

export default function index() {
  const { id } = useParams();
  const [ds, setDS] = useState([]);
  const [nienkhoa, setNienKhoa] = useState('');
  const [hocky, setHocKy] = useState(1);
  const [nhom, setNhom] = useState('');
  const [mamh, setMamh] = useState('');

  const [dsmh, setDSMH] = useState([]);

  useEffect(() => {
    const fetchDS = async () => {
      try {
        const response = await monHocApi.getAll();
        setDSMH(response);
        setMamh(response[0].MAMH);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchDS();
  }, [])

  useEffect(() => {
    const fetchDS = async () => {
      try {
        const response = await sinhVienApi.getSV_LMH(id);
        setDS(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchDS();
  }, [])

  useEffect(() => {
    const fetchDS = async () => {
      try {
        const response = await lopMHApi.getOne(id);
        setNienKhoa(response.NIENKHOA.trim());
        setHocKy(response.HOCKY);
        setNhom(response.NHOM);
        setMamh(response.MAMH);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchDS();
  }, [])

  return (
    <div >
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardBody>
            <CForm
              className="row g-3 needs-validation"
            >
              <h5>Thông tin lớp môn học</h5>
              <CCol md={3}>
                <div className="mb-3">
                  <CFormLabel>Niên khóa</CFormLabel>
                  <CFormInput disabled
                    type="text"
                    required
                    value={nienkhoa}
                  />
                </div>
              </CCol>

              <CCol md={3}>
                <div className="mb-3">
                  <CFormLabel>Học kỳ</CFormLabel>
                  <CFormSelect className="mb-3" disabled
                    value={hocky}>
                    <option disabled>Chọn học kỳ...</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                  </CFormSelect>
                </div>
              </CCol>

              <CCol md={3}>
                <div className="mb-3">
                  <CFormLabel>Nhóm</CFormLabel>
                  <CFormInput disabled
                    type="number"
                    required
                    min="1"
                    value={nhom}
                  />
                </div>
              </CCol>

              <CCol md={3}>
                <div className="mb-3">
                  <CFormLabel>Môn học</CFormLabel>
                  <CFormSelect className="mb-3" disabled
                    value={mamh}>
                    <option disabled>Chọn môn học...</option>
                    {dsmh && (dsmh.map((mh) => (
                      <option value={mh.MAMH} key={mh.MAMH}>{mh.TENMH}</option>
                    )))}
                  </CFormSelect>
                </div>
              </CCol>
            </CForm>
          </CCardBody>
          <CCardBody>
            <CTable striped hover>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Mã sinh viên</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Họ</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Tên</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Ngày sinh</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Địa chỉ</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Email</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Điểm</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {ds && (ds.map((sv, idx) => (
                  <CTableRow key={sv.MASV}>
                    <CTableHeaderCell scope="row">{idx + 1}</CTableHeaderCell>
                    <CTableDataCell>{sv.MASV}</CTableDataCell>
                    <CTableDataCell>{sv.HO}</CTableDataCell>
                    <CTableDataCell>{sv.TEN}</CTableDataCell>
                    <CTableDataCell>{sv.NGAYSINH.slice(8, 10) + "/" +
                      sv.NGAYSINH.slice(5, 7) + "/" + sv.NGAYSINH.slice(0, 4)}</CTableDataCell>
                    <CTableDataCell>{sv.DIACHI}</CTableDataCell>
                    <CTableDataCell>{sv.EMAIL}</CTableDataCell>
                    <CTableDataCell>{sv.DIEM}</CTableDataCell>
                  </CTableRow>
                )))}
                {ds.length === 0 &&
                  <CTableRow >
                    <CTableHeaderCell colSpan="8">Không có dữ liệu!</CTableHeaderCell>
                  </CTableRow>
                }
              </CTableBody>
            </CTable>
          </CCardBody>
        </CCard>
      </CCol>
    </div>
  )
}
