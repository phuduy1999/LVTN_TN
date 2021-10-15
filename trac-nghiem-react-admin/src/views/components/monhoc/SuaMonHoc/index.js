import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import monHocApi from 'src/api/monHocApi';
import AppModalCustom from 'src/components/AppModalCustom';
import _chuanHoaChuoi from 'src/_chuanHoaChuoi.js';
import FormMonHoc from '../FormMonHoc';

export default function index() {
  const { id } = useParams();
  const [mamh, setMamh] = useState('');
  const [tenmh, setTenmh] = useState('');
  const [visible, setVisible] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [mess, setMess] = useState(false)
  const pageRedirect = '/monhoc/ds-monhoc';
  const [mh, setMH] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await monHocApi.getOne(id);
        setMH(response);
        setMamh(_chuanHoaChuoi(response.MAMH));
        setTenmh(_chuanHoaChuoi(response.TENMH));
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])

  const [validated, setValidated] = useState(false)
  const handleSubmit = event => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    else if (_chuanHoaChuoi(mh.MAMH) === mamh && _chuanHoaChuoi(mh.TENMH) === tenmh) {
      setVisible(!visible);
      setMess('Bạn chưa sửa gì hết!')
    }
    else {
      monHocApi.updateOne(id, {
        MAMH: mamh,
        TENMH: tenmh
      })
        .then(function (response) {
          console.log(response);

          setVisible(!visible);
          setIsSuccess(true);
          setMess('Sửa môn học thành công!')
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
      <FormMonHoc
        validated={validated}
        handleSubmit={handleSubmit}
        cardHeader={'Sửa mới môn học'}
        btnTitle={'Sửa'}
        mamh={mamh} setMamh={setMamh}
        tenmh={tenmh} setTenmh={setTenmh}
      />
      <AppModalCustom visible={visible} handleSetVisible={() => { setVisible(false) }}
        mess={mess} isSuccess={isSuccess} pageRedirect={pageRedirect} />
    </Fragment>
  )
}
