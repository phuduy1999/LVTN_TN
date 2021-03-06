import { CCard, CCardBody, CCardFooter, CCardText, CCardTitle, CCol, CRow } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import lichSuThiApi from 'src/api/lichSuThiApi';
import { Link } from 'react-router-dom'
import InfoUserLogin from 'src/_infoUser';
import _formatDate from 'src/_formatDate';

export default function index() {
  const [ds, setDS] = useState([]);

  useEffect(() => {
    const fetchDS = async () => {
      try {
        const user = InfoUserLogin();
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
                    Ngày thi {_formatDate(bt.NGAYTHI)}
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
