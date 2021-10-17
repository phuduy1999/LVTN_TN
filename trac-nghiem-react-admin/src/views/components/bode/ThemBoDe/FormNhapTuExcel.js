import { CButton, CCol, CForm, CFormInput, CFormLabel, CFormSelect, CInputGroup, CRow, CTable, CTableBody, CTableDataCell, CTableHead, CTableHeaderCell, CTableRow, CTooltip } from '@coreui/react';
import React, { useEffect, useState } from 'react';
import { useController, useForm } from "react-hook-form";
import boDeApi from 'src/api/boDeApi';
import monHocApi from 'src/api/monHocApi';
import _chuanHoaChuoi from 'src/_chuanHoaChuoi';
import XLSX from 'xlsx';
import InfoUserLogin from 'src/_infoUser';
import { cilWarning } from '@coreui/icons';
import CIcon from '@coreui/icons-react';

const FileInput = ({ control, name, handleFile, setData, setIsLoaded }) => {
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
          setIsLoaded(false);
        }
      }}
    />
  );
};

export default function FormNhapTuExcel({ setVisible, setIsSuccess, setMess }) {
  const [data, setData] = useState([]);
  const [dsmh, setDSMH] = useState([]);
  const [dsch, setDSCH] = useState([]);
  const [mamh, setMamh] = useState('');
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
    formData.append('MAMH', mamh);
    formData.append('MAGV', InfoUserLogin()?.MAGV);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await monHocApi.getAll();
        const response1 = await boDeApi.getAll();
        setDSCH(response1.map((r) => r.NOIDUNG));
        setDSMH(response);
        setMamh(response[0].MAMH);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [])

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

      const t = getViTriBatDauNoiDung(data);
      console.log(t);
      if (!t.isValid) {
        setIsLoaded(false);
        setData([]);
        setVisible(true);
        setMess('File excel không hợp lệ! Vui lòng kiểm tra lại.');
        return;
      }

      const listCauHoi = getListCauHoi(data, t);
      if (listCauHoi.length === 0) {
        setIsLoaded(false);
        setData([]);
        setVisible(true);
        setMess('File excel không hợp lệ! Vui lòng kiểm tra lại.(không tìm thấy nội dung câu hỏi)');
        return;
      }

      setIsLoaded(true);

      //check trùng câu hỏi(nội dung)
      const result = checkTrungCauhoi_DB(listCauHoi, dsch);
      if (!result.isValid) {
        setIsLoaded(false);
        setVisible(true);
        setMess('File excel không hợp lệ! Vui lòng kiểm tra lại.(Tất cả câu hỏi đã tồn tại)');
      }

      console.log(result.listCauHoiDaCheck);

      /* Update state */
      setData(result.listCauHoiDaCheck);
    };
    reader.readAsArrayBuffer(file);
  }

  return (
    <CForm onSubmit={handleSubmit(onSubmit)}>
      <CFormLabel htmlFor="formFile">Chọn file câu hỏi dạng excel</CFormLabel>
      <CRow className='mt-4'>
        <CCol md={4}>
          <CFormSelect className="mb-3"
            value={mamh}
            onChange={(e) => setMamh(e.target.value)}>
            <option disabled>Chọn môn học...</option>
            {dsmh && (dsmh.map((mh) => (
              <option value={mh.MAMH} key={mh.MAMH}>{mh.TENMH}</option>
            )))}
          </CFormSelect>
        </CCol>
        <CCol md={8}>
          <CInputGroup>
            <FileInput
              control={control} name='fileExcel'
              handleFile={handleFile} setData={setData}
              setIsLoaded={setIsLoaded}
            />
            <CButton type="submit" color="primary">
              Thêm
            </CButton>
          </CInputGroup>
        </CCol>

        <CTable striped hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col">#</CTableHeaderCell>
              {data[0] && Object.keys(data[0]).map((title, idx) => (
                <CTableHeaderCell scope="col" key={idx} className='text-center'>
                  {title !== 'trung' ? title : 'Trạng thái'}
                </CTableHeaderCell>
              )
              )}
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {data.map((ch, idx) => (
              <CTableRow key={idx}>
                <CTableDataCell>{idx + 1}</CTableDataCell>
                {data[0] && Object.keys(data[0]).map((title, index) => (
                  <CTableDataCell
                    key={index}
                    className={'text-center ' + (ch['trung'] ? 'text-danger' : '')}>
                    {title === 'trung' && ch['trung'] &&
                      <CTooltip content="Câu hỏi đã tồn tại!" placement="left" >
                        <CIcon icon={cilWarning} size='xl' />
                      </CTooltip>
                    }
                    {title !== 'trung' && ch[title]}
                  </CTableDataCell>
                )
                )}
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CRow>
    </CForm>
  )
}

/* list of supported file types */
const SheetJSFT = [
  "xlsx", "xlsb", "xlsm", "xls", "xml", "csv", "txt", "ods", "fods", "uos", "sylk", "dif", "dbf", "prn", "qpw", "123", "wb*", "wq*", "html", "htm"
].map(x => `.${x}`).join(",");

const getViTriBatDauNoiDung = (data) => {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (typeof data[i][j] === 'string') {
        const nd = _chuanHoaChuoi(data[i][j]).toUpperCase();
        if (nd === 'NOIDUNG' || nd === 'NOI DUNG' || nd === 'NỘI DUNG') {
          return {
            isValid: true,
            dong: i,
            cot: j
          }
        }
      }
    }
  }
  return {
    isValid: false,
  }
}

const getListCauHoi = (data, t) => {
  const headers = ['NOIDUNG', 'MALOAICH', 'TRINHDO', 'DAP_AN'];
  const listCauHoi = [];
  //get nội dung câu hỏi
  for (let i = t.dong + 1; i < data.length; i++) {
    if (data[i][t.cot] === '') break;

    let cauhoi = {};
    headers.forEach((h, idx) => {
      cauhoi[h] = _chuanHoaChuoi(data[i][t.cot + idx].toString());
    })

    let vt = t.cot + headers.length;
    for (let j = vt; j < vt + 4; j++) {
      cauhoi[String.fromCharCode(65 + j - vt)] = _chuanHoaChuoi(data[i][j].toString());
    }

    listCauHoi.push(cauhoi);
  }

  return listCauHoi;
}

function checkTrungCauhoi_DB(listCauHoi, dsch) {
  let isValid = false;
  const values = [...listCauHoi];
  const arr = values.map((val) => {
    const trung = dsch.some((d) => d === val.NOIDUNG);
    if (!trung) isValid = true;
    return {
      ...val,
      trung: trung,
    }
  })
  return { listCauHoiDaCheck: arr, isValid: isValid };
}
