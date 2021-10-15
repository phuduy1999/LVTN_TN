import React, { Fragment, useState } from 'react';
import khoaApi from 'src/api/khoaApi';
import AppModalCustom from 'src/components/AppModalCustom';
import FormKhoa from 'src/views/components/khoa/FormKhoa';

export default function index() {
  const [makh, setMakh] = useState('');
  const [tenkh, setTenkh] = useState('');
  const [visible, setVisible] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [mess, setMess] = useState(false)
  const pageRedirect = '/khoa/ds-khoa';

  const [validated, setValidated] = useState(false)
  const handleSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    else {

      khoaApi.addOne({
        MAKH: makh,
        TENKH: tenkh
      })
        .then(function (response) {
          console.log(response);

          setVisible(!visible);
          setIsSuccess(true);
          setMess('Thêm khoa thành công!')

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
        cardHeader={'Thêm mới khoa'}
        btnTitle={'Thêm'}
        makh={makh} setMakh={setMakh}
        tenkh={tenkh} setTenkh={setTenkh}
      />
      <AppModalCustom visible={visible} handleSetVisible={() => { setVisible(false) }}
        mess={mess} isSuccess={isSuccess} pageRedirect={pageRedirect} />
    </Fragment>
  )
}
