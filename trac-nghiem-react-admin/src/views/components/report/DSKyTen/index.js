import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Viewer from 'src/views/pages/reportViewer/Viewer'
import reportApi from 'src/api/reportApi';

export default function index() {
  const { id } = useParams();
  const reportTemplate = 'Report_DSKYTEN.mrt';
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await reportApi.getDSKyTen(id);
        setData(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  return (
    <Viewer data={data} reportTemplate={reportTemplate} />
  )
}
