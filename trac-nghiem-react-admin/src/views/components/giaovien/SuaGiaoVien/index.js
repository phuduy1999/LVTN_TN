import React, { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import giaoVienApi from 'src/api/giaoVienApi';
import AppModalCustom from 'src/components/AppModalCustom';
import FormGiaoVien from 'src/views/components/giaovien/FormGiaoVien';
import _chuanHoaChuoi from 'src/_chuanHoaChuoi.js';

export default function index() {
  const { id } = useParams();
  const [magv, setMagv] = useState('');
  const [ten, setTen] = useState('');
  const [ho, setHo] = useState('');
  const [diachi, setDiaChi] = useState('');
  const [sdt, setSDT] = useState('');
  const [email, setEmail] = useState('');
  const [makh, setMakh] = useState('');
  const [manq, setManq] = useState('');
  const [visible, setVisible] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [mess, setMess] = useState(false)
  const pageRedirect = '/giaovien/ds-giaovien';
  const [gv, setGV] = useState({});

  const [validated, setValidated] = useState(false)
  const handleSubmit = event => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    else if (_chuanHoaChuoi(gv.HO) === ho && _chuanHoaChuoi(gv.TEN) === ten &&
      _chuanHoaChuoi(gv.DIACHI) === diachi && _chuanHoaChuoi(gv.SDT) === sdt && gv.MAKH === makh) {
      setVisible(!visible);
      setMess('Bạn chưa sửa gì hết!')
    }
    else {

      giaoVienApi.updateOne(id, {
        HO: ho,
        TEN: ten,
        DIACHI: diachi,
        SDT: sdt,
        MAKH: makh
      })
        .then(function (response) {
          console.log(response);

          setVisible(!visible);
          setIsSuccess(true);
          setMess('Sửa giáo viên thành công!')
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
        const response = await giaoVienApi.getOne(id);
        setGV(response);
        setMagv(_chuanHoaChuoi(response.MAGV));
        setHo(_chuanHoaChuoi(response.HO));
        setTen(_chuanHoaChuoi(response.TEN));
        setDiaChi(_chuanHoaChuoi(response.DIACHI));
        setEmail(_chuanHoaChuoi(response.EMAIL));
        setSDT(_chuanHoaChuoi(response.SDT));
        setMakh(response.MAKH);
        setManq(response.MANQ);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])

  return (
    <Fragment>
      <FormGiaoVien
        validated={validated}
        handleSubmit={handleSubmit}
        cardHeader={'Sửa giáo viên'}
        btnTitle={'Sửa'}
        isEdit={true}
        makh={makh} setMakh={setMakh}
        manq={manq} setManq={setManq}
        magv={magv} setMagv={setMagv}
        ho={ho} setHo={setHo}
        ten={ten} setTen={setTen}
        diachi={diachi} setDiaChi={setDiaChi}
        email={email} setEmail={setEmail}
        sdt={sdt} setSDT={setSDT}
      />
      <AppModalCustom visible={visible} handleSetVisible={() => { setVisible(false) }}
        mess={mess} isSuccess={isSuccess} pageRedirect={pageRedirect} />
    </Fragment>
  )
}
