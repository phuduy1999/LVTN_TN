import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Viewer from 'src/views/pages/reportViewer/Viewer'
import reportApi from 'src/api/reportApi';

export default function index() {
  const { status } = useParams();
  const reportTemplate = 'Report_LOPMONHOC.mrt';
  const [data, setData] = useState({});
  const [title, setTitle] = useState(status === 1 + "" ? "MỞ" : "HỦY");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await reportApi.getDSLopMonHoc(status);
        setData(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <Viewer data={data} reportTemplate={reportTemplate} title={title} />
  )
}
