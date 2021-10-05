import { CCard, CCardBody, CCardFooter, CCardText, CCardTitle, CCol, CRow } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import lichSuThiApi from 'src/api/lichSuThiApi';
import { Link } from 'react-router-dom'

export default function index() {
  const [ds, setDS] = useState([]);

  useEffect(() => {
    const fetchDS = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const response = await lichSuThiApi.getLichSuThi({
          MASV: user.MASV,
        });
        setDS(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchDS();
  }, [])

  return (
    <div >
      <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }}>
        {ds &&
          ds.map((bt) => (
            <CCol xs key={bt.IDLMH}>
              <CCard className='mb-3 border-dark' >
                <CCardBody>
                  <CCardTitle>Điểm: {bt.DIEM}</CCardTitle>
                  <CCardText>
                    Niên khóa: {bt.NIENKHOA} <br />
                    Học kỳ: {bt.HOCKY} <br />
                    Nhóm: {bt.NHOM} <br />
                    Môn học: {bt.TENMH} <br />
                  </CCardText>
                  <Link to={`/lich-su-thi/chi-tiet-bai-thi/${bt.IDLMH}/${bt.DIEM}`}>
                    Xem chi tiết bài thi
                  </Link>
                </CCardBody>
                <CCardFooter>
                  <small className="text-muted">
                    Ngày thi {bt.NGAYTHI && bt.NGAYTHI.slice(8, 10) + "/" +
                      bt.NGAYTHI.slice(5, 7) + "/" + bt.NGAYTHI.slice(0, 4)}
                  </small>
                </CCardFooter>
              </CCard>
            </CCol>
          ))
        }

        {ds.length === 0 &&
          <p><strong>Không có dữ liệu!</strong></p>
        }
      </CRow>
    </div>
  )
}
