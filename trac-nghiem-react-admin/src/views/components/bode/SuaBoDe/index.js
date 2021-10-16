import { CCard, CCardBody, CCardHeader, CCol } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import boDeApi from 'src/api/boDeApi';
import AppModalCustom from 'src/components/AppModalCustom';
import _chuanHoaChuoi from 'src/_chuanHoaChuoi.js';
import FormBoDe from '../FormBoDe';

export default function index() {
  //new
  const [choices, setChoices] = useState([]);

  //old
  const { id } = useParams();
  const [trinhdo, setTrinhDo] = useState('A');
  const [noidung, setNoiDung] = useState('');
  const [dap_an_dk, setDapAnDK] = useState('');
  const [dap_an_nlc, setDapAnNLC] = useState(null);
  const [mamh, setMamh] = useState('');
  const [malch, setMalch] = useState('');
  const [visible, setVisible] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [mess, setMess] = useState(false)
  const [isDK, setIsDK] = useState(true);
  const pageRedirect = '/bode/ds-bode';
  const [ch, setCH] = useState({});

  const chuaSua = () => {
    if (ch.TRINHDO.trim() === trinhdo.trim() && ch.MAMH.trim() === mamh.trim()
      && _chuanHoaChuoi(ch.NOIDUNG) === noidung) {
      if (ch.MALOAICH.trim() === 'DK') {
        if (ch.DAP_AN.trim() === dap_an_dk) {
          return true;
        }
      } else {
        const values = ch.LUACHON.map(lc => {
          return lc.NOIDUNG;
        })
        if (JSON.stringify(values) === JSON.stringify(choices)) {
          return true;
        }
      }
    }
    return false;
  }

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
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    else if (!checkLuaChonPhanBietNhau(choices)) {
      setVisible(!visible);
      setMess('Các lựa chọn phải phân biệt nhau!');
    }
    else if (chuaSua()) {
      setVisible(!visible);
      setMess('Bạn chưa sửa gì hết!')
    }
    else {
      boDeApi.updateOne(id, {
        TRINHDO: trinhdo,
        MAMH: mamh,
        NOIDUNG: noidung,
        DAP_AN: isDK ? dap_an_dk : String.fromCharCode(65 + parseInt(dap_an_nlc)),
        CAC_LUA_CHON: arrToJsonChoices(choices),
      })
        .then(response => {
          console.log(response);

          setVisible(!visible);
          setIsSuccess(true);
          setMess('Sửa bộ đề thành công!')
        })
        .catch(error => {
          console.log(error);

          setVisible(!visible);
          setMess('Lỗi: ' + error.response.data.err)
        })
    }
    setValidated(true)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await boDeApi.getOne(id);
        setCH(response);
        setTrinhDo(response.TRINHDO.trim());
        setNoiDung(_chuanHoaChuoi(response.NOIDUNG));
        setMamh(response.MAMH);
        setMalch(response.MALOAICH);
        if (response.MALOAICH.trim() === 'DK') {
          setDapAnDK(response.DAP_AN.trim());
        }
        else {
          setIsDK(false);
          let idxDapAn;
          setChoices(response.LUACHON.map((c, idx) => {
            if (c.STT === response.DAP_AN.trim()) idxDapAn = idx;
            return c.NOIDUNG;
          }))
          setDapAnNLC(idxDapAn);
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])

  return (
    <CCol xs={12}>
      <CCard className="mb-4">
        <CCardHeader>
          <strong>Sửa câu hỏi thi</strong>
        </CCardHeader>
        <CCardBody>
          <FormBoDe
            validated={validated}
            handleSubmit={handleSubmit}
            btnTitle={'Sửa'}
            isEdit={true}
            choices={choices} setChoices={setChoices}
            trinhdo={trinhdo} setTrinhDo={setTrinhDo}
            noidung={noidung} setNoiDung={setNoiDung}
            dap_an_dk={dap_an_dk} setDapAnDK={setDapAnDK}
            dap_an_nlc={dap_an_nlc} setDapAnNLC={setDapAnNLC}
            mamh={mamh} setMamh={setMamh}
            malch={malch} setMalch={setMalch}
            isDK={isDK} setIsDK={setIsDK}
          />
        </CCardBody>
      </CCard>
      <AppModalCustom visible={visible} handleSetVisible={() => { setVisible(false) }}
        mess={mess} isSuccess={isSuccess} pageRedirect={pageRedirect} />
    </CCol >
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
