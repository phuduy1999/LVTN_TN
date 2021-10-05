import {
  cibBitdefender,
  cibC,
  cibDynatrace,
  cibHackhands, cibSublimeText,
  cibTumblr, cilPeople, cilSpeedometer,
  cilStar,
  cilStream,
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
    name: 'Chức năng',
    id: 'chuc-nang',
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
    component: CNavItem,
    name: 'Thi thử',
    to: '/thi-thu',
    icon: <CIcon icon={cibTumblr} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Đăng ký lớp môn học',
    to: '/dang-ky-lopmh',
    icon: <CIcon icon={cilStream} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Thi trắc nghiệm',
    to: '/thi',
    icon: <CIcon icon={cibTumblr} customClassName="nav-icon" />,
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
