import { cilLockLocked } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormFeedback,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow
} from '@coreui/react'
import React, { useState } from 'react'
import AppModalCustom from 'src/components/AppModalCustom'
import loginApi from 'src/api/loginApi'
import InfoUserLogin from 'src/_infoUser';

const ChangePassword = () => {
  const [emailLogin, setEmailLogin] = useState(InfoUserLogin()?.EMAIL);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [newPassRepeat, setNewPassRepeat] = useState('');
  const [visible, setVisible] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [mess, setMess] = useState(false)
  const pageRedirect = '/';

  const [validated, setValidated] = useState(false)
  const handleSubmit = event => {
    const form = event.currentTarget
    event.preventDefault()
    if (form.checkValidity() === false) {
      event.stopPropagation()
    }
    else if (newPass !== newPassRepeat) {
      setVisible(!visible);
      setIsSuccess(false);
      setMess('Mật khẩu nhập lại không trùng mật khẩu mới!');
    }
    else {
      loginApi.changePasswordTeacher({
        EMAIL: emailLogin,
        PASSWORD: oldPass,
        PASSWORD_NEW: newPass,
      }).then(response => {
        console.log(response);

        setVisible(!visible);
        setIsSuccess(true);
        setMess('Đổi mật khẩu thành công!')

      }).catch(error => {
        console.log(error);
        setVisible(!visible);
        setIsSuccess(false);
        setMess('Đổi mật khẩu không thành công! ' + error.response.data.err)
      })
    }
    setValidated(true)
  }

  const handleSetVisible = () => {
    setVisible(false);
  }

  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm
                  noValidate
                  validated={validated}
                  onSubmit={handleSubmit}
                >
                  <h1>Change password</h1>
                  <p className="text-medium-emphasis">Change your password</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput disabled
                      placeholder="Email"
                      autoComplete="email"
                      value={emailLogin}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Old password"
                      required
                      value={oldPass}
                      onChange={(e) => setOldPass(e.target.value)}
                    />
                    <CFormFeedback invalid>Vui lòng nhập password cũ!</CFormFeedback>
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="New password"
                      required
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                    />
                    <CFormFeedback invalid>Vui lòng nhập password mới!</CFormFeedback>
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Repeat new password"
                      required
                      value={newPassRepeat}
                      onChange={(e) => setNewPassRepeat(e.target.value)}
                    />
                    <CFormFeedback invalid>Vui lòng nhập lại password mới!</CFormFeedback>
                  </CInputGroup>
                  <div className="d-grid">
                    <CButton color="success" type="submit">Change password</CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
            <AppModalCustom visible={visible} handleSetVisible={handleSetVisible}
              mess={mess} isSuccess={isSuccess} pageRedirect={pageRedirect} />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default ChangePassword;
