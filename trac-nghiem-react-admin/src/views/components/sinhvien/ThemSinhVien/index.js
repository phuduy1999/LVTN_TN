import React, { Fragment, useState } from 'react';
import sinhVienApi from 'src/api/sinhVienApi';
import AppModalCustom from 'src/components/AppModalCustom';
import FormSinhVien from '../FormSinhVien';

export default function index() {
  const [masv, setMasv] = useState('');
  const [ten, setTen] = useState('');
  const [ho, setHo] = useState('');
  const [diachi, setDiaChi] = useState('');
  const [email, setEmail] = useState('');
  const [ngaysinh, setNgaySinh] = useState('');
  const [visible, setVisible] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [mess, setMess] = useState(false)
  const pageRedirect = '/sinhvien/ds-sinhvien';

  const [validated, setValidated] = useState(false)
  const handleSubmit = event => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    else {

      sinhVienApi.addOne({
        MASV: masv,
        HO: ho,
        TEN: ten,
        DIACHI: diachi,
        EMAIL: email,
        NGAYSINH: ngaysinh
      })
        .then(function (response) {
          console.log(response);

          setVisible(!visible);
          setIsSuccess(true);
          setMess('Thêm sinh viên thành công!')
        })
        .catch(function (error) {
          console.log(error.response);
          setVisible(!visible);
          setMess('Lỗi: ' + error.response.data.err)
        });
    }
    setValidated(true)
  }

  return (
    <Fragment>
      <FormSinhVien
        validated={validated}
        handleSubmit={handleSubmit}
        cardHeader={'Thêm mới sinh viên'}
        btnTitle={'Thêm'}
        masv={masv} setMasv={setMasv}
        ho={ho} setHo={setHo}
        ten={ten} setTen={setTen}
        diachi={diachi} setDiaChi={setDiaChi}
        email={email} setEmail={setEmail}
        ngaysinh={ngaysinh} setNgaySinh={setNgaySinh}
      />
      <AppModalCustom visible={visible} handleSetVisible={() => { setVisible(false) }}
        mess={mess} isSuccess={isSuccess} pageRedirect={pageRedirect} />
    </Fragment>
  )
}
