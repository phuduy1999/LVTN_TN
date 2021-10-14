import React from 'react'
import dsKyten from './views/components/report/DSKyTen'

//Route report
const DSKyTen = React.lazy(() => import('./views/components/report/DSKyTen'))

// const page404 = React.lazy(() => import('./views/pages/page404/Page404'))

const routesReport = [

  { path: '/ds-kyten/:id', name: 'Danh sách ký tên', component: dsKyten },

  //404
  // { path: '*', name: '404', component: page404 },

]

export default routesReport
