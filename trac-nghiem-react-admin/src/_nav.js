import {
  cibBitdefender,
  cibC,
  cibDynatrace,
  cibHackhands, cibSublimeText,
  cibTumblr, cilPeople, cilSpeedometer,
  cilStar,
  cilUserFemale
} from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import React from 'react'

const _nav = [
  {
    component: CNavItem,
    name: 'Home',
    to: '/',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'Nhập liệu',
    id: 'nhap-lieu',
  },
  {
    component: CNavGroup,
    name: 'Khoa',
    to: '/khoa',
    icon: <CIcon icon={cibHackhands} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh sách khoa',
        to: '/khoa/ds-khoa',
      },
      {
        component: CNavItem,
        name: 'Thêm mới khoa',
        to: '/khoa/them-khoa',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Giáo viên',
    to: '/giaovien',
    icon: <CIcon icon={cilUserFemale} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh sách giáo viên',
        to: '/giaovien/ds-giaovien',
      },
      {
        component: CNavItem,
        name: 'Thêm mới giáo viên',
        to: '/giaovien/them-giaovien',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Sinh viên',
    to: '/sinhvien',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh sách sinh viên',
        to: '/sinhvien/ds-sinhvien',
      },
      {
        component: CNavItem,
        name: 'Thêm mới sinh viên',
        to: '/sinhvien/them-sinhvien',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Môn học',
    to: '/monhoc',
    icon: <CIcon icon={cibSublimeText} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh sách môn học',
        to: '/monhoc/ds-monhoc',
      },
      {
        component: CNavItem,
        name: 'Thêm mới môn học',
        to: '/monhoc/them-monhoc',
      },
    ],
  },
  {
    component: CNavGroup,
    name: 'Lớp môn học',
    to: '/lopmonhoc',
    icon: <CIcon icon={cibC} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh sách lớp môn học',
        to: '/lopmonhoc/ds-lopmonhoc',
      },
      {
        component: CNavItem,
        name: 'Thêm mới lớp môn học',
        to: '/lopmonhoc/them-lopmonhoc',
      },
    ],
  },
  {
    component: CNavTitle,
    name: 'Soạn câu hỏi thi',
    id: 'soan-cht',
  },
  {
    component: CNavGroup,
    name: 'Bộ đề',
    to: '/bode',
    icon: <CIcon icon={cibBitdefender} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh sách câu hỏi thi',
        to: '/bode/ds-bode',
      },
      {
        component: CNavItem,
        name: 'Thêm mới câu hỏi thi',
        to: '/bode/them-bode',
      },
    ],
  },
  {
    component: CNavItem,
    name: 'Loại câu hỏi',
    to: '/loaicauhoi',
    icon: <CIcon icon={cibTumblr} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Đăng ký thi',
    id: 'dk-thi'
  },
  {
    component: CNavGroup,
    name: 'Đăng ký thi',
    to: '/dangky',
    icon: <CIcon icon={cibDynatrace} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Danh sách đăng ký thi',
        to: '/dangky/ds-dangky',
      },
      {
        component: CNavItem,
        name: 'Đăng ký thi mới',
        to: '/dangky/them-dangky',
      },
    ],
  },
  {
    icon: <CIcon icon={cibC} customClassName="nav-icon" />,
    component: CNavItem,
    name: 'Danh sách lớp môn học',
    to: '/lopmonhoc/ds-lopmonhoc',
  },
  {
    component: CNavTitle,
    name: 'Tài khoản',
    id: 'tai-khoan'
  },
  {
    component: CNavItem,
    name: 'Login',
    to: '/login',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />
  },
]

export default _nav
