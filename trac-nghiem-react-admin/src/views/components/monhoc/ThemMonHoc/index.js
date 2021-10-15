import React, { Fragment, useState } from 'react';
import monHocApi from 'src/api/monHocApi';
import AppModalCustom from 'src/components/AppModalCustom';
import FormMonHoc from '../FormMonHoc';

export default function index() {
  const [mamh, setMamh] = useState('');
  const [tenmh, setTenmh] = useState('');
  const [visible, setVisible] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [mess, setMess] = useState(false)
  const pageRedirect = '/monhoc/ds-monhoc';

  const [validated, setValidated] = useState(false)
  const handleSubmit = event => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    else {
      monHocApi.addOne({
        MAMH: mamh,
        TENMH: tenmh
      })
        .then(function (response) {
          console.log(response);

          setVisible(!visible);
          setIsSuccess(true);
          setMess('Thêm môn học thành công!')
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
        cardHeader={'Thêm mới môn học'}
        btnTitle={'Thêm'}
        mamh={mamh} setMamh={setMamh}
        tenmh={tenmh} setTenmh={setTenmh}
      />
      <AppModalCustom visible={visible} handleSetVisible={() => { setVisible(false) }}
        mess={mess} isSuccess={isSuccess} pageRedirect={pageRedirect} />
    </Fragment>
  )
}
