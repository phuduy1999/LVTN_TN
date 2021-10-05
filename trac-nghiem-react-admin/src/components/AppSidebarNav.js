import React from 'react'
import { NavLink, useHistory, useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'

import { CBadge } from '@coreui/react'

import jwt_decode from "jwt-decode";

export const AppSidebarNav = ({ items }) => {
  const location = useLocation()
  const navLink = (name, icon, badge) => {
    return (
      <>
        {icon && icon}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
          component: NavLink,
          activeClassName: 'active',
        })}
        key={index}
        {...rest}
      >
        {navLink(name, icon, badge)}
      </Component>
    )
  }
  const navGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item
    const Component = component
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index),
        )}
      </Component>
    )
  }

  let toArr = []; // items
  let idArr = []; // titles

  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.accessToken) {
    if (user.MANQ === 'PGV') {
      idArr = ['nhap-lieu', 'soan-cht', 'dk-thi']
      toArr = ['/dashboard', '/khoa', '/giaovien', '/sinhvien', '/monhoc', '/lopmonhoc', '/bode', '/loaicauhoi', '/dangky'];
    }
    else if (user.MANQ === 'GV') {
      idArr = ['soan-cht', 'dk-thi']
      toArr = ['/dashboard', '/bode', '/loaicauhoi', '/dangky', '/lopmonhoc/ds-lopmonhoc'];
    }
    else {
      const history = useHistory();
      history.push('/500');
    }
  } else {
    idArr = ['tai-khoan']
    toArr = ['/login'];
  }

  return (
    <React.Fragment>
      {items &&
        items.map((item, index) => {
          if (toArr.includes(item.to) || idArr.includes(item.id)) {
            if (item.items) {
              return navGroup(item, index)
            }
            else { return navItem(item, index) }
          }
        })}
    </React.Fragment>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
