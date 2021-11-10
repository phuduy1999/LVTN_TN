import { CButton, CCard, CCardBody, CCardHeader, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CTooltip } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import sinhVienApi from 'src/api/sinhVienApi';
import monHocApi from 'src/api/monHocApi';
import lopMHApi from 'src/api/lopMHApi';
import { cilPrint } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

export default function index() {
  const { id } = useParams();
  const [ds, setDS] = useState([]);
  const [nienkhoa, setNienKhoa] = useState('');
  const [hocky, setHocKy] = useState(1);
  const [nhom, setNhom] = useState('');
  const [mamh, setMamh] = useState('');

  const [dsmh, setDSMH] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await monHocApi.getAll();
        setDSMH(response);
        setMamh(response[0].MAMH);
        console.log(response);
        const response1 = await lopMHApi.getOne(id);
        setNienKhoa(response1.NIENKHOA.trim());
        setHocKy(response1.HOCKY);
        setNhom(response1.NHOM);
        setMamh(response1.MAMH);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sinhVienApi.getSV_LMH(id);
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
                  <CTableHeaderCell scope="col" className='text-center'>Chi tiết bài thi</CTableHeaderCell>
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
                    <CTableDataCell className='text-center'>
                      <CTooltip content="Chi tiết bài thi" placement="right" className='me-3'>
                        <Link to={`/report/lopmonhoc-sv/${id}/${sv.MASV}`} target='_blank'>
                          <CIcon icon={cilPrint} size='lg' />
                        </Link>
                      </CTooltip>
                    </CTableDataCell>
                  </CTableRow>
                )))}
                {ds.length === 0 &&
                  <CTableRow >
                    <CTableHeaderCell colSpan="8">Không có dữ liệu!</CTableHeaderCell>
                  </CTableRow>
                }
              </CTableBody>
            </CTable>
            <div className="d-grid gap-2 col-2 mx-auto mt-4">
              <Link to={`/report/bangdiem/${id}`} target='_blank'>
                <CTooltip content="Bảng điểm sinh viên" placement="right" className='me-3'>
                  <CButton color="secondary" variant="outline">
                    In bảng điểm
                  </CButton>
                </CTooltip>
              </Link>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </div>
  )
}
