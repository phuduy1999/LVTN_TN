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
  { path: '/khoa/ds-khoa', name: 'Danh sách khoa', component: DSKhoa },
  { path: '/khoa/them-khoa', name: 'Thêm mới khoa', component: ThemKhoa },
  { path: '/khoa/sua-khoa/:id', name: 'Sửa khoa', component: SuaKhoa },
  //GIAOVIEN
  { path: '/giaovien', name: 'Giáo viên', component: DSGiaoVien, exact: true },
  { path: '/giaovien/ds-giaovien', name: 'Danh sách giáo viên', component: DSGiaoVien },
  { path: '/giaovien/them-giaovien', name: 'Thêm mới giáo viên', component: ThemGiaoVien },
  { path: '/giaovien/sua-giaovien/:id', name: 'Sửa giáo viên', component: SuaGiaoVien },
  //MONHOC
  { path: '/monhoc', name: 'Môn học', component: DSMonHoc, exact: true },
  { path: '/monhoc/ds-monhoc', name: 'Danh sách môn học', component: DSMonHoc },
  { path: '/monhoc/them-monhoc', name: 'Thêm mới môn học', component: ThemMonHoc },
  { path: '/monhoc/sua-monhoc/:id', name: 'Sửa môn học', component: SuaMonHoc },
  //LOPMONHOC
  { path: '/lopmonhoc', name: 'Lớp môn học', component: DSLopMonHoc, exact: true },
  { path: '/lopmonhoc/ds-lopmonhoc', name: 'Danh sách lớp môn học', component: DSLopMonHoc },
  { path: '/lopmonhoc/them-lopmonhoc', name: 'Thêm mới lớp môn học', component: ThemLopMonHoc },
  { path: '/lopmonhoc/sua-lopmonhoc/:id', name: 'Sửa lớp môn học', component: SuaLopMonHoc },
  { path: '/lopmonhoc/ds-sinhvien/:id', name: 'Danh sách sinh viên lớp môn học', component: DSSinhVienLMH },
  //SINHVIEN
  { path: '/sinhvien', name: 'Sinh viên', component: DSSinhVien, exact: true },
  { path: '/sinhvien/ds-sinhvien', name: 'Danh sách sinh viên', component: DSSinhVien },
  { path: '/sinhvien/them-sinhvien', name: 'Thêm mới sinh viên', component: ThemSinhVien },
  { path: '/sinhvien/sua-sinhvien/:id', name: 'Sửa sinh viên', component: SuaSinhVien },
  //LOAICAUHOI
  { path: '/loaicauhoi', name: 'Loại câu hỏi', component: DSLoaiCauHoi, exact: true },
  //BODE
  { path: '/bode', name: 'Câu hỏi thi', component: DSBoDe, exact: true },
  { path: '/bode/ds-bode', name: 'Danh sách câu hỏi thi', component: DSBoDe },
  { path: '/bode/them-bode', name: 'Thêm mới câu hỏi thi', component: ThemBoDe },
  { path: '/bode/sua-bode/:id', name: 'Sửa câu hỏi thi', component: SuaBoDe },
  //DANGKY
  { path: '/dangky', name: 'Đăng ký thi', component: DSDangKy, exact: true },
  { path: '/dangky/ds-dangky', name: 'Danh sách đăng ký thi', component: DSDangKy },
  { path: '/dangky/them-dangky', name: 'Đăng ký thi mới', component: ThemDangKy },
  { path: '/dangky/sua-dangky/:id', name: 'Sửa đăng ký thi', component: SuaDangKy },
  //CSDL
  { path: '/csdl', name: 'Sao lưu phục hồi database', component: SaoLuuPhucHoi, exact: true },


  //404
  { path: '*', name: '404', component: page404 },

]

export default routes
