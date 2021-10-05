import { CButton, CCallout, CForm, CFormInput, CFormLabel, CInputGroup, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow } from '@coreui/react';
import React, { useState } from 'react';
import XLSX from 'xlsx';
import { useForm, useController } from "react-hook-form";
import boDeApi from 'src/api/boDeApi';
import monHocApi from 'src/api/monHocApi';
import _chuanHoaChuoi from 'src/_chuanHoaChuoi'
import CIcon from '@coreui/icons-react';
import { cilArrowRight } from '@coreui/icons';

const FileInput = ({ control, name, handleFile, setData, setMonHoc, setIsLoaded }) => {
  const { field } = useController({ control, name });
  const [value, setValue] = useState("");
  return (
    <CFormInput
      type="file"
      value={value}
      accept={SheetJSFT}
      required
      onChange={(e) => {
        setValue(e.target.value);
        field.onChange(e.target.files);
        const files = e.target.files;
        if (files && files[0]) {
          handleFile(files[0]);
        }
        else {
          setData([]);
          setMonHoc('');
          setIsLoaded(false);
        }
      }}
    />
  );
};

export default function FormNhapTuExcel({ setVisible, setIsSuccess, setMess }) {
  const [data, setData] = useState([]);
  const [monhoc, setMonHoc] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  const { control, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    if (!isLoaded) {
      setVisible(true);
      setMess('File excel không hợp lệ!');
      return;
    }
    console.log(data);
    const formData = new FormData();
    formData.append('fileExcel', data.fileExcel[0]);
    try {
      const response = await boDeApi.addByExcel(formData);
      console.log(response);
      setIsSuccess(true);
      setVisible(true);
      setMess('Thêm thành công bộ đề từ file excel!');
    }
    catch (error) {
      console.log(error);
      setVisible(true);
      setMess(error.response.data.err);
    }
  }

  const getMonHoc = (data) => {
    let tenMonHoc = '';
    let dongNoiDung = 0;
    let cotNoiDung = 0;
    //get môn học
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].length; j++) {
        if (typeof data[i][j] === 'string') {
          let str = _chuanHoaChuoi(data[i][j]).toLowerCase();
          if (str === 'môn học' || str === 'mon hoc' || str === 'monhoc') {
            if (tenMonHoc === '') {
              tenMonHoc = _chuanHoaChuoi(data[i][j + 1]);
              for (let k = i + 1; k < data.length; k++) {
                const nd = _chuanHoaChuoi(data[k][j]).toUpperCase();
                if (nd === 'NOIDUNG' || nd === 'NOI DUNG' || nd === 'NỘI DUNG') {
                  dongNoiDung = k;
                  cotNoiDung = j;
                }
              }
              break;
            }
          }
        }
      }
      if (tenMonHoc !== '') break;
    }

    monHocApi.getOneByName(tenMonHoc)
      .then(response => {
        if (response.data === '') {
          throw Error('Không tồn tại môn học trong file excel. Vui lòng kiểm tra lại!')
        }
        setMonHoc(response);
      })
      .catch(error => {
        setVisible(true);
        setMess(error.message);
        setMonHoc('');
        setData([]);
        setIsLoaded(false);
      })

    return {
      dong: dongNoiDung,
      cot: cotNoiDung
    }
  }

  const getListCauHoi = (data, t) => {
    const headers = ['NOIDUNG', 'MALOAICH', 'TRINHDO', 'DAP_AN'];
    const listCauHoi = [];
    //get nội dung câu hỏi
    for (let i = t.dong + 1; i < data.length; i++) {
      if (data[i][t.cot] === '') continue;

      let cauhoi = {};
      headers.forEach((h, idx) => {
        cauhoi[h] = _chuanHoaChuoi(data[i][t.cot + idx].toString());
      })

      let vt = t.cot + headers.length;
      for (let j = vt; j < data[i].length; j++) {
        cauhoi[String.fromCharCode(65 + j - vt)] = _chuanHoaChuoi(data[i][j].toString());
      }

      listCauHoi.push(cauhoi);
    }

    return listCauHoi;
  }

  const handleFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      /* Parse data */
      const ab = e.target.result;
      const wb = XLSX.read(ab, { type: 'array' });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 1, defval: '' });
      console.log(data);

      const t = getMonHoc(data);
      console.log(t);
      if (t.dong === 0) {
        setIsLoaded(false);
        setData([]);
        return;
      }

      const listCauHoi = getListCauHoi(data, t);

      console.log(listCauHoi);
      setIsLoaded(true);
      /* Update state */
      setData(listCauHoi);
    };
    reader.readAsArrayBuffer(file);
  }

  return (
    <CForm onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <CFormLabel htmlFor="formFile">Chọn file câu hỏi dạng excel</CFormLabel>
        <CInputGroup>
          <FileInput
            control={control} name='fileExcel'
            handleFile={handleFile} setData={setData} setMonHoc={setMonHoc}
            setIsLoaded={setIsLoaded}
          />
          <CButton type="submit" color="primary">
            Thêm
          </CButton>
        </CInputGroup>

        {monhoc !== '' &&
          <CCallout color="secondary">
            Môn học: {monhoc.TENMH + "  "}
            <span><CIcon icon={cilArrowRight} />  </span>
            Mã môn học: {monhoc.MAMH}
            <span className='text-success'>(Hợp lệ)</span>
          </CCallout>
        }

        <CTable striped hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              {data[0] && Object.keys(data[0]).map((title, idx) => (
                <CTableHeaderCell scope="col" key={idx}>{title}</CTableHeaderCell>
              ))}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {data.map((ch, idx) => (
              <CTableRow key={idx}>
                <CTableDataCell>{idx + 1}</CTableDataCell>
                {data[0] && Object.keys(data[0]).map((title, index) => (
                  <CTableDataCell key={index}>{ch[title]}</CTableDataCell>
                ))}
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </div>
    </CForm>
  )
}

/* list of supported file types */
const SheetJSFT = [
  "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(x => `.${x}`).join(",");
