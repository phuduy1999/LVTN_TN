import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import sinhVienApi from 'src/api/sinhVienApi';
import AppModalCustom from 'src/components/AppModalCustom';
import FormSinhVien from '../FormSinhVien';
import _chuanHoaChuoi from 'src/_chuanHoaChuoi.js';

export default function index() {
  const { id } = useParams();
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
  const [sv, setSV] = useState({});

  const [validated, setValidated] = useState(false)
  const handleSubmit = event => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    else if (_chuanHoaChuoi(sv.MASV) === masv && _chuanHoaChuoi(sv.HO) === ho &&
      _chuanHoaChuoi(sv.TEN) === ten && _chuanHoaChuoi(sv.DIACHI) === diachi
      && sv.NGAYSINH.split('T')[0] === ngaysinh) {
      setVisible(!visible);
      setMess('Bạn chưa sửa gì hết!')
    }
    else {
      sinhVienApi.updateOne(id, {
        MASV: masv,
        HO: ho,
        TEN: ten,
        DIACHI: diachi,
        NGAYSINH: ngaysinh
      })
        .then(function (response) {
          console.log(response);

          setVisible(!visible);
          setIsSuccess(true);
          setMess('Sửa sinh viên thành công!')
        })
        .catch(function (error) {
          console.log(error.response);
          setVisible(!visible);
          setMess('Lỗi: ' + error.response.data.err)
        });
    }
    setValidated(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await sinhVienApi.getOne(id);
        setSV(response);
        setMasv(response.MASV.trim());
        setHo(response.HO.trim());
        setTen(response.TEN.trim());
        setDiaChi(response.DIACHI.trim());
        setEmail(response.EMAIL.trim());
        setNgaySinh(response.NGAYSINH.split('T')[0]);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])

  return (
    <Fragment>
      <FormSinhVien
        validated={validated}
        handleSubmit={handleSubmit}
        cardHeader={'Sửa sinh viên'}
        btnTitle={'Sửa'}
        isEdit={true}
        masv={masv} setMagv={setMasv}
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
