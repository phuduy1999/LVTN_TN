import React from 'react'

//PHAN MEM THI TRAC NGHIEM
const ChuanBiThi = React.lazy(() => import('./views/components/thi/ChuanBiThi'))
const ChuanBiThiThu = React.lazy(() => import('./views/components/thi/ChuanBiThiThu'))
const BatDauThi = React.lazy(() => import('./views/components/thi/BatDauThi'))
const BatDauThiThu = React.lazy(() => import('./views/components/thi/BatDauThiThu'))
const DangKyLopMH = React.lazy(() => import('./views/components/dangkylopmh/DKLopMH'))
const DSDKLopMH = React.lazy(() => import('./views/components/dangkylopmh/DSDKLopMH'))
const DSBaiThiDaThi = React.lazy(() => import('./views/components/lichsuthi/DSBaiThiDaThi'))
const ChiTietBaiThi = React.lazy(() => import('./views/components/lichsuthi/ChiTietBaiThi'))

const page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const pageWelcome = React.lazy(() => import('./views/pages/pageWelcome/PageWelcome'))

const routes = [
  { path: '/', exact: true, name: 'Home', component: pageWelcome },

  // PM THI TRAC NGHIEM
  //THI-THU
  { path: '/thi-thu', name: 'Thi thử', component: ChuanBiThiThu, exact: true },
  { path: '/thi-thu/:td/:tg/:sct/:mamh', name: 'Thi thử TN', component: BatDauThiThu, exact: true },
  //THI
  { path: '/thi', name: 'Chuẩn bị thi', component: ChuanBiThi, exact: true },
  { path: '/thi/:id', name: 'Thi trắc nghiệm', component: BatDauThi, exact: true },

  //DANG KY LOPMH
  { path: '/dang-ky-lopmh', name: 'Đăng ký lớp môn học', component: DangKyLopMH, exact: true },
  { path: '/ds-dang-ky-lopmh', name: 'Danh sách lớp môn học đã đăng ký', component: DSDKLopMH, exact: true },

  //XEM LAI BAI THI
  { path: '/lich-su-thi', name: 'Bài thi cũ', component: DSBaiThiDaThi, exact: true },
  { path: '/lich-su-thi/chi-tiet-bai-thi/:id/:diem', name: 'Chi tiết bài thi', component: ChiTietBaiThi, exact: true },

  //404
  { path: '*', name: '404', component: page404 },

]

export default routes
