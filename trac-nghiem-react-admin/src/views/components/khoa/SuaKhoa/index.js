import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import khoaApi from 'src/api/khoaApi';
import AppModalCustom from 'src/components/AppModalCustom';
import FormKhoa from 'src/views/components/khoa/FormKhoa';
import _chuanHoaChuoi from 'src/_chuanHoaChuoi.js';

export default function index() {
  const { id } = useParams();
  const [makh, setMakh] = useState('');
  const [tenkh, setTenkh] = useState('');
  const [visible, setVisible] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [mess, setMess] = useState(false)
  const pageRedirect = '/khoa/ds-khoa';
  const [kh, setKH] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await khoaApi.getOne(id);
        setKH(response);
        setMakh(_chuanHoaChuoi(response.MAKH));
        setTenkh(_chuanHoaChuoi(response.TENKH));
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])

  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    else if (_chuanHoaChuoi(kh.MAKH) === makh &&
      _chuanHoaChuoi(kh.TENKH) === tenkh) {
      setVisible(!visible);
      setMess('Bạn chưa sửa gì hết!')
    }
    else {
      khoaApi.updateOne(id, {
        MAKH: makh,
        TENKH: tenkh
      })
        .then(function (response) {
          console.log(response);

          setVisible(!visible);
          setIsSuccess(true);
          setMess('Sửa khoa thành công!');
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
      <FormKhoa
        validated={validated}
        handleSubmit={handleSubmit}
        cardHeader={'Sửa khoa'}
        btnTitle={'Sửa'}
        makh={makh} setMakh={setMakh}
        tenkh={tenkh} setTenkh={setTenkh}
      />
      <AppModalCustom visible={visible} handleSetVisible={() => { setVisible(false) }}
        mess={mess} isSuccess={isSuccess} pageRedirect={pageRedirect} />
    </Fragment>
  )
}
