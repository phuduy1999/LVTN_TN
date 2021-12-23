import { CButton, CCard, CCardBody, CCardFooter, CCardText, CCardTitle, CCol, CRow } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import dangKyLopMHApi from 'src/api/dangKyLopMHApi';
import lichSuThiApi from 'src/api/lichSuThiApi';
import InfoUserLogin from 'src/_infoUser';
import _formatDate from 'src/_formatDate';
import moment from 'moment';
import AppModalCustom from 'src/components/AppModalCustom';
import dangKyApi from 'src/api/dangKyApi';

export default function index() {
  const [ds, setDS] = useState([]);
  const [dsDaThi, setDSDaThi] = useState([]);
  const [visible, setVisible] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [mess, setMess] = useState(false)
  const [pageRedirect, setPageRedirect] = useState('');


  useEffect(() => {
    const fetchDS = async () => {
      try {
        const user = InfoUserLogin();
        const response = await dangKyLopMHApi.getLMHdaDK(user.MASV);
        setDS(response);
        const response1 = await lichSuThiApi.getLichSuThi({
          MASV: user.MASV,
        });
        setDSDaThi(response1);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchDS();
  }, [])

  const handleOnclick = (bt) => {
    dangKyApi.checkRegister({
      NIENKHOA: bt.NIENKHOA,
      HOCKY: bt.HOCKY,
      NHOM: bt.NHOM,
      MAMH: bt.MAMH[0],
      MASV: InfoUserLogin().MASV,
    })
      .then(function (response) {
        console.log(response);

        setPageRedirect(`/thi/${response.IDDK}`);
        setVisible(!visible);
        setIsSuccess(true);
        setMess('Thông tin đăng ký thi hợp lệ! Bạn sẽ được chuyển tới trang thi...')
      })
      .catch(function (error) {
        console.log(error.response);
        setVisible(!visible);
        setMess('Lỗi: ' + error.response.data.err)
      });
  }

  return (
    <div >
      <CRow xs={{ cols: 1, gutter: 4 }} md={{ cols: 3 }}>
        {ds &&
          ds.map((bt) => (
            <CCol xs key={bt.IDLMH}>
              <CCard className='mb-3 border-dark' >
                <CCardBody>
                  <CCardTitle> Môn học: {bt.TENMH}</CCardTitle>
                  <CCardText>
                    Niên khóa: {bt.NIENKHOA} <br />
                    Học kỳ: {bt.HOCKY} <br />
                    Nhóm: {bt.NHOM} <br />
                  </CCardText>
                  {_formatDate(moment().format()) === _formatDate(bt.NGAYTHI)
                    && !dsDaThi.some((item) => item.IDLMH === bt.IDLMH) &&
                    <CButton onClick={() => handleOnclick(bt)}>Thi</CButton>
                  }
                  {_formatDate(moment().format()) !== _formatDate(bt.NGAYTHI)
                    && !dsDaThi.some((item) => item.IDLMH === bt.IDLMH) &&
                    <CButton CButton disabled>Chưa tới hoặc đã qua ngày thi</CButton>
                  }
                  {dsDaThi.some((item) => item.IDLMH === bt.IDLMH) &&
                    <CButton disabled>Đã thi</CButton>
                  }
                </CCardBody>
                <CCardFooter>
                  <small className="text-muted">
                    Ngày thi {_formatDate(bt.NGAYTHI)}
                    {!bt.NGAYTHI && <span> chưa có</span>}
                  </small>
                </CCardFooter>
              </CCard>
            </CCol>
          ))
        }

        {ds.length === 0 &&
          <p><strong>Không có dữ liệu!</strong></p>
        }

        <AppModalCustom visible={visible} handleSetVisible={() => setVisible(false)}
          mess={mess} isSuccess={isSuccess} pageRedirect={pageRedirect} />
      </CRow>
    </div >
  )
}
