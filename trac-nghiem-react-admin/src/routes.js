import React from 'react'

//PHAN MEM THI TRAC NGHIEM
const DSKhoa = React.lazy(() => import('./views/components/khoa/DSKhoa'))
const ThemKhoa = React.lazy(() => import('./views/components/khoa/ThemKhoa'))
const SuaKhoa = React.lazy(() => import('./views/components/khoa/SuaKhoa'))

const DSGiaoVien = React.lazy(() => import('./views/components/giaovien/DSGiaoVien'))
const ThemGiaoVien = React.lazy(() => import('./views/components/giaovien/ThemGiaoVien'))
const SuaGiaoVien = React.lazy(() => import('./views/components/giaovien/SuaGiaoVien'))

const DSMonHoc = React.lazy(() => import('./views/components/monhoc/DSMonHoc'))
const ThemMonHoc = React.lazy(() => import('./views/components/monhoc/ThemMonHoc'))
const SuaMonHoc = React.lazy(() => import('./views/components/monhoc/SuaMonHoc'))

const DSLopMonHoc = React.lazy(() => import('./views/components/lopmonhoc/DSLopMonHoc'))
const DSLopMonHocDaHuy = React.lazy(() => import('./views/components/lopmonhoc/DSLopMonHocDaHuy'))
const ThemLopMonHoc = React.lazy(() => import('./views/components/lopmonhoc/ThemLopMonHoc'))
const SuaLopMonHoc = React.lazy(() => import('./views/components/lopmonhoc/SuaLopMonHoc'))
const DSSinhVienLMH = React.lazy(() => import('./views/components/lopmonhoc/DSSinhVienLMH'))

const DSSinhVien = React.lazy(() => import('./views/components/sinhvien/DSSinhVien'))
const ThemSinhVien = React.lazy(() => import('./views/components/sinhvien/ThemSinhVien'))
const SuaSinhVien = React.lazy(() => import('./views/components/sinhvien/SuaSinhVien'))

const DSLoaiCauHoi = React.lazy(() => import('./views/components/loaicauhoi/DSLoaiCauHoi'))

const DSBoDe = React.lazy(() => import('./views/components/bode/DSBoDe'))
const ThemBoDe = React.lazy(() => import('./views/components/bode/ThemBoDe'))
const SuaBoDe = React.lazy(() => import('./views/components/bode/SuaBoDe'))

const SaoLuuPhucHoi = React.lazy(() => import('./views/components/csdl/saoLuuPhucHoi'))

const DSDangKy = React.lazy(() => import('./views/components/dangky/DSDangKy'))
const ThemDangKy = React.lazy(() => import('./views/components/dangky/ThemDangKy'))
const SuaDangKy = React.lazy(() => import('./views/components/dangky/SuaDangKy'))

const page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const pageWelcome = React.lazy(() => import('./views/pages/pageWelcome/PageWelcome'))

const routes = [
  { path: '/', exact: true, name: 'Home', component: pageWelcome },

  // PM THI TRAC NGHIEM
  //KHOA
  { path: '/khoa', name: 'Khoa', component: DSKhoa, exact: true },
  { path: '/khoa/ds-khoa', name: 'Danh s??ch khoa', component: DSKhoa },
  { path: '/khoa/them-khoa', name: 'Th??m m???i khoa', component: ThemKhoa },
  { path: '/khoa/sua-khoa/:id', name: 'S???a khoa', component: SuaKhoa },
  //GIAOVIEN
  { path: '/giaovien', name: 'Gi??o vi??n', component: DSGiaoVien, exact: true },
  { path: '/giaovien/ds-giaovien', name: 'Danh s??ch gi??o vi??n', component: DSGiaoVien },
  { path: '/giaovien/them-giaovien', name: 'Th??m m???i gi??o vi??n', component: ThemGiaoVien },
  { path: '/giaovien/sua-giaovien/:id', name: 'S???a gi??o vi??n', component: SuaGiaoVien },
  //MONHOC
  { path: '/monhoc', name: 'M??n h???c', component: DSMonHoc, exact: true },
  { path: '/monhoc/ds-monhoc', name: 'Danh s??ch m??n h???c', component: DSMonHoc },
  { path: '/monhoc/them-monhoc', name: 'Th??m m???i m??n h???c', component: ThemMonHoc },
  { path: '/monhoc/sua-monhoc/:id', name: 'S???a m??n h???c', component: SuaMonHoc },
  //LOPMONHOC
  { path: '/lopmonhoc', name: 'L???p m??n h???c', component: DSLopMonHoc, exact: true },
  { path: '/lopmonhoc/ds-lopmonhoc', name: 'Danh s??ch l???p m??n h???c', component: DSLopMonHoc },
  { path: '/lopmonhoc/ds-lopmonhoc-dahuy', name: 'Danh s??ch l???p m??n h???c ???? h???y', component: DSLopMonHocDaHuy },
  { path: '/lopmonhoc/them-lopmonhoc', name: 'Th??m m???i l???p m??n h???c', component: ThemLopMonHoc },
  { path: '/lopmonhoc/sua-lopmonhoc/:id', name: 'S???a l???p m??n h???c', component: SuaLopMonHoc },
  { path: '/lopmonhoc/ds-sinhvien/:id', name: 'Danh s??ch sinh vi??n l???p m??n h???c', component: DSSinhVienLMH },
  //SINHVIEN
  { path: '/sinhvien', name: 'Sinh vi??n', component: DSSinhVien, exact: true },
  { path: '/sinhvien/ds-sinhvien', name: 'Danh s??ch sinh vi??n', component: DSSinhVien },
  { path: '/sinhvien/them-sinhvien', name: 'Th??m m???i sinh vi??n', component: ThemSinhVien },
  { path: '/sinhvien/sua-sinhvien/:id', name: 'S???a sinh vi??n', component: SuaSinhVien },
  //LOAICAUHOI
  { path: '/loaicauhoi', name: 'Lo???i c??u h???i', component: DSLoaiCauHoi, exact: true },
  //BODE
  { path: '/bode', name: 'C??u h???i thi', component: DSBoDe, exact: true },
  { path: '/bode/ds-bode', name: 'Danh s??ch c??u h???i thi', component: DSBoDe },
  { path: '/bode/them-bode', name: 'Th??m m???i c??u h???i thi', component: ThemBoDe },
  { path: '/bode/sua-bode/:id', name: 'S???a c??u h???i thi', component: SuaBoDe },
  //DANGKY
  { path: '/dangky', name: '????ng k?? thi', component: DSDangKy, exact: true },
  { path: '/dangky/ds-dangky', name: 'Danh s??ch ????ng k?? thi', component: DSDangKy },
  { path: '/dangky/them-dangky', name: '????ng k?? thi m???i', component: ThemDangKy },
  { path: '/dangky/sua-dangky/:id', name: 'S???a ????ng k?? thi', component: SuaDangKy },
  //CSDL
  { path: '/csdl', name: 'Sao l??u ph???c h???i database', component: SaoLuuPhucHoi, exact: true },


  //404
  { path: '*', name: '404', component: page404 },

]

export default routes
