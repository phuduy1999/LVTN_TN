import React, { Fragment, useState } from 'react';
import lopMHApi from 'src/api/lopMHApi';
import AppModalCustom from 'src/components/AppModalCustom';
import FormLopMonHoc from '../FormLopMonHoc';

export default function index() {
  const [nienkhoa, setNienKhoa] = useState('');
  const [hocky, setHocKy] = useState(1);
  const [nhom, setNhom] = useState('');
  const [sosvtt, setSOVTT] = useState('');
  const [mamh, setMamh] = useState('');
  const [magv, setMagv] = useState('');
  const [makh, setMakh] = useState('');
  const [visible, setVisible] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [mess, setMess] = useState(false)
  const pageRedirect = '/lopmonhoc/ds-lopmonhoc';

  const [validated, setValidated] = useState(false)
  const handleSubmit = event => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    else if (!validateNienKhoa(nienkhoa)) {
      setVisible(!visible);
      setMess('Niên khóa không hợp lệ');
    }
    else {
      lopMHApi.addOne({
        MAGV: magv,
        NIENKHOA: nienkhoa,
        HOCKY: hocky,
        NHOM: nhom,
        SOSVTT: sosvtt,
        MAMH: mamh,
        MAKH: makh
      })
        .then(function (response) {
          console.log(response);

          setVisible(!visible);
          setIsSuccess(true);
          setMess('Thêm lớp môn học thành công!')
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
      <FormLopMonHoc
        validated={validated}
        handleSubmit={handleSubmit}
        cardHeader={'Thêm mới lớp môn học'}
        btnTitle={'Thêm'}
        isEdit={false}
        makh={makh} setMakh={setMakh}
        mamh={mamh} setMamh={setMamh}
        magv={magv} setMagv={setMagv}
        nienkhoa={nienkhoa} setNienKhoa={setNienKhoa}
        hocky={hocky} setHocKy={setHocKy}
        nhom={nhom} setNhom={setNhom}
        sosvtt={sosvtt} setSOVTT={setSOVTT}
      />
      <AppModalCustom visible={visible} handleSetVisible={() => { setVisible(false) }}
        mess={mess} isSuccess={isSuccess} pageRedirect={pageRedirect} />
    </Fragment>
  )
}

const validateNienKhoa = (nienkhoa) => {
  if (nienkhoa) {
    const years = nienkhoa.split('-');
    if (years.length === 2) {
      const yearStart = parseInt(years[0]);
      const yearEnd = parseInt(years[1]);
      if (yearStart !== NaN && yearEnd !== NaN) {
        if (yearEnd - yearStart === 1 && yearStart >= 1900 && yearEnd <= 2999) {
          return true;
        }
      }
    }
  }
  return false;
}
