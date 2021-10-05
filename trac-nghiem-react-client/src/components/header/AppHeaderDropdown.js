import {
  cilHistory,
  cilList,
  cilLockLocked, cilUser
} from '@coreui/icons';
import CIcon from '@coreui/icons-react';
import {
  CAvatar, CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle
} from '@coreui/react';
import React from 'react';
import { Link } from 'react-router-dom';

const AppHeaderDropdown = (props) => {
  const { handleLogout } = props

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src="/avatars/8.jpg" size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-light fw-semibold py-2">Account</CDropdownHeader>
        <Link className="dropdown-item" to='/ds-dang-ky-lopmh'>
          <CIcon icon={cilList} className="me-2" />
          Lớp môn học
        </Link>
        <Link className="dropdown-item" to='/lich-su-thi'>
          <CIcon icon={cilHistory} className="me-2" />
          Bài thi cũ
        </Link>
        <Link className="dropdown-item" to='/change-password'>
          <CIcon icon={cilUser} className="me-2" />
          Change password
        </Link>
        <CDropdownDivider />
        <CDropdownItem onClick={() => handleLogout()}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Log out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown >
  )
}

export default AppHeaderDropdown
