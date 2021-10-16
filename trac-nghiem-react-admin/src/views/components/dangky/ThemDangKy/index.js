import React, { Fragment, useState } from 'react';
import dangKyApi from 'src/api/dangKyApi';
import AppModalCustom from 'src/components/AppModalCustom';
import InfoUserLogin from 'src/_infoUser';
import FormDangKy from '../FormDangKy';

export default function index() {
  const [trinhdo, setTrinhDo] = useState('A');
  const [nienkhoa, setNienKhoa] = useState('');
  const [hocky, setHocKy] = useState(1);
  const [nhom, setNhom] = useState('');
  const [ngaythi, setNgayThi] = useState('');
  const [mamh, setMamh] = useState('');
  const [sct, setSCT] = useState('');
  const [tg, setTG] = useState('');
  const [visible, setVisible] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [mess, setMess] = useState(false)
  const pageRedirect = '/dangky/ds-dangky';

  const [validated, setValidated] = useState(false)
  const handleSubmit = event => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    else {
      dangKyApi.addOne({
        MAGVDK: InfoUserLogin()?.MAGV,
        NIENKHOA: nienkhoa,
        HOCKY: hocky,
        NHOM: nhom,
        SCT: sct,
        MAMH: mamh,
        THOIGIANTHI: tg,
        NGAYTHI: ngaythi,
        TRINHDODK: trinhdo,
      })
        .then(function (response) {
          console.log(response);
          setVisible(!visible);
          setIsSuccess(true);
          setMess('Đăng ký thi thành công!')
        })
        .catch(function (error) {
          console.log(error.response);
          setVisible(!visible);
          setMess(error.response.data.err)
        });
    }
    setValidated(true)
  }

  return (
    <Fragment>
      <FormDangKy
        validated={validated}
        handleSubmit={handleSubmit}
        cardHeader={'Đăng ký thi cho lớp môn học'}
        btnTitle={'Đăng ký'}
        trinhdo={trinhdo} setTrinhDo={setTrinhDo}
        nienkhoa={nienkhoa} setNienKhoa={setNienKhoa}
        hocky={hocky} setHocKy={setHocKy}
        nhom={nhom} setNhom={setNhom}
        ngaythi={ngaythi} setNgayThi={setNgayThi}
        mamh={mamh} setMamh={setMamh}
        sct={sct} setSCT={setSCT}
        tg={tg} setTG={setTG}
      />
      <AppModalCustom visible={visible} handleSetVisible={() => { setVisible(false) }}
        mess={mess} isSuccess={isSuccess} pageRedirect={pageRedirect} />
    </Fragment>
  )
}
