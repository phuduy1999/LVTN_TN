import React, { Fragment, useState } from 'react';
import giaoVienApi from 'src/api/giaoVienApi';
import AppModalCustom from 'src/components/AppModalCustom';
import FormGiaoVien from 'src/views/components/giaovien/FormGiaoVien';

export default function index() {
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

  const [validated, setValidated] = useState(false)
  const handleSubmit = event => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    else {

      giaoVienApi.addOne({
        MAGV: magv,
        HO: ho,
        TEN: ten,
        DIACHI: diachi,
        EMAIL: email.trim(),
        SDT: sdt,
        MAKH: makh,
        MANQ: manq,
      })
        .then(function (response) {
          console.log(response);

          setVisible(!visible);
          setIsSuccess(true);
          setMess('Thêm giáo viên thành công!')
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
      <FormGiaoVien
        validated={validated}
        handleSubmit={handleSubmit}
        cardHeader={'Thêm mới giáo viên'}
        btnTitle={'Thêm'}
        isEdit={false}
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
