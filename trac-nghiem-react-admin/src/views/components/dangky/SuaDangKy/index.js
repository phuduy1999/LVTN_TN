import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import dangKyApi from 'src/api/dangKyApi';
import AppModalCustom from 'src/components/AppModalCustom';
import _chuanHoaChuoi from 'src/_chuanHoaChuoi.js';
import FormDangKy from '../FormDangKy';

export default function index() {
  const { id } = useParams();
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
  const [dk, setDK] = useState({});

  const [validated, setValidated] = useState(false)
  const handleSubmit = event => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    else if (dk.TRINHDODK.trim() === trinhdo.trim() && dk.SCT === sct &&
      dk.THOIGIANTHI === tg && dk.NGAYTHI.split('T')[0] === ngaythi) {
      setVisible(!visible);
      setMess('Bạn chưa sửa gì hết!')
    }
    else {
      dangKyApi.updateOne(id, {
        SCT: sct,
        THOIGIANTHI: tg,
        NGAYTHI: ngaythi,
        TRINHDODK: trinhdo,
      })
        .then(function (response) {
          console.log(response);

          setVisible(!visible);
          setIsSuccess(true);
          setMess('Sửa đăng ký thi thành công!')
        })
        .catch(function (error) {
          console.log(error.response);
          setVisible(!visible);
          setMess('Lỗi sửa đăng ký thi! ' + error.response.data.err)
        });
    }
    setValidated(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dangKyApi.getOne(id);
        setDK(response);
        setTrinhDo(response.TRINHDODK.trim());
        setNienKhoa(_chuanHoaChuoi(response.NIENKHOA));
        setHocKy(response.HOCKY);
        setNhom(response.NHOM);
        setMamh(response.MAMH);
        setNgayThi(response.NGAYTHI.split('T')[0]);
        setSCT(response.SCT);
        setTG(response.THOIGIANTHI);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])

  return (
    <Fragment>
      <FormDangKy
        validated={validated}
        handleSubmit={handleSubmit}
        cardHeader={'Sửa đăng ký thi cho lớp môn học'}
        btnTitle={'Sửa'}
        isEdit={true}
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
