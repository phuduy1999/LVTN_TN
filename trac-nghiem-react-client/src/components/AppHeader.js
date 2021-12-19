import { cilMenu } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler, CNavItem, CNavLink, CNavTitle
} from '@coreui/react'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logo } from 'src/assets/brand/logo'
import { AppHeaderDropdown } from './header/index'
import { AppBreadcrumb } from './index'
import InfoUserLogin from 'src/_infoUser';

const AppHeader = (props) => {
  const { handleLogout } = props;
  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const [email, setEmail] = useState('Welcome! ');
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const user = InfoUserLogin();
    if (user && user.accessToken) {
      setEmail(email + user.EMAIL + ` (${user.MANQ})`);
      setIsLogin(true);
    }
  }, [])

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand>
        <CHeaderNav className="d-none d-md-flex me-auto">
          <CNavItem>
            <CNavLink to="/" component={NavLink} activeClassName="active">
              Home
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav>
          <CNavTitle>
            {email}
          </CNavTitle>
        </CHeaderNav>
        {isLogin &&
          <CHeaderNav className="ms-3">
            <AppHeaderDropdown handleLogout={handleLogout} />
          </CHeaderNav>}
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
