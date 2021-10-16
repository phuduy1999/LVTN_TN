import React, { useState } from 'react';
import boDeApi from 'src/api/boDeApi';
import InfoUserLogin from 'src/_infoUser';
import FormBoDe from '../FormBoDe';

export default function FormNhapBoDe({ setVisible, setIsSuccess, setMess }) {
  //new
  const [choices, setChoices] = useState(['Tùy chọn 1', 'Tùy chọn 2']);

  //old
  const [trinhdo, setTrinhDo] = useState('A');
  const [noidung, setNoiDung] = useState('');
  const [dap_an_dk, setDapAnDK] = useState('');
  const [dap_an_nlc, setDapAnNLC] = useState(null);
  const [mamh, setMamh] = useState('');
  const [malch, setMalch] = useState('');
  const [isDK, setIsDK] = useState(true);

  const arrToJsonChoices = (choices) => {
    return choices.map((choice, idx) => {
      return {
        STT: String.fromCharCode(65 + idx),
        NOIDUNG: choice,
      }
    })
  }

  const [validated, setValidated] = useState(false)
  const handleSubmit = event => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    else if (!checkLuaChonPhanBietNhau(choices)) {
      setVisible(true);
      setMess('Các lựa chọn phải phân biệt nhau!');
    }
    else {
      boDeApi.addOne({
        TRINHDO: trinhdo,
        MAMH: mamh,
        MALOAICH: malch,
        NOIDUNG: noidung,
        MAGV: InfoUserLogin()?.MAGV,
        DAP_AN: isDK ? dap_an_dk : String.fromCharCode(65 + parseInt(dap_an_nlc)),
        CAC_LUA_CHON: arrToJsonChoices(choices),
      })
        .then(response => {
          console.log(response);

          setVisible(true);
          setIsSuccess(true);
          setMess('Thêm bộ đề thành công!')
        })
        .catch(error => {
          console.log(error);

          setVisible(true);
          setMess('Lỗi thêm bộ đề! ' + error.response.data.err)
        })
    }
    setValidated(true);
  }

  return (
    <FormBoDe
      validated={validated}
      handleSubmit={handleSubmit}
      btnTitle={'Thêm'}
      choices={choices} setChoices={setChoices}
      trinhdo={trinhdo} setTrinhDo={setTrinhDo}
      noidung={noidung} setNoiDung={setNoiDung}
      dap_an_dk={dap_an_dk} setDapAnDK={setDapAnDK}
      dap_an_nlc={dap_an_nlc} setDapAnNLC={setDapAnNLC}
      mamh={mamh} setMamh={setMamh}
      malch={malch} setMalch={setMalch}
      isDK={isDK} setIsDK={setIsDK}
    />
  )
}

const checkLuaChonPhanBietNhau = (choices) => {
  const values = [...choices];
  let arrSort = values.sort((a, b) => a > b ? 1 : -1);
  for (let i = 0; i < arrSort.length - 1; i++) {
    if (arrSort[i] === arrSort[i + 1]) {
      return false;
    }
  }
  return true;
}
