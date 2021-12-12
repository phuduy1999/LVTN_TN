import { cilLockLocked, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormFeedback,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow
} from '@coreui/react'
import jwt_decode from "jwt-decode"
import React, { useState } from 'react'
import giaoVienApi from 'src/api/giaoVienApi'
import sinhVienApi from 'src/api/sinhVienApi'
import loginApi from 'src/api/loginApi'
import AppModalCustom from 'src/components/AppModalCustom'

const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
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
    else {
      loginApi.login({
        EMAIL: email,
        PASSWORD: pass,
      }).then(response => {
        console.log(response);
        const user = { ...response };

        const token = response.accessToken;
        if (token) {
          const decoded = jwt_decode(token);
          if (decoded.MAGV) {
            user.MAGV = decoded.MAGV.trim();
          }
          else if (decoded.MASV) {
            user.MASV = decoded.MASV.trim();
          }
          user.EMAIL = decoded.EMAIL.trim();
          user.MANQ = decoded.MANQ.trim();
        }

        if (response.accessToken) {
          localStorage.setItem("user", JSON.stringify(user));
        }

        setVisible(!visible);
        setIsSuccess(true);
        setMess('Đăng nhập thành công!')

      }).catch(error => {
        console.log(error);
        setVisible(!visible);
        setMess('Đăng nhập không thành công!. Vui lòng kiểm tra lại Email và mật khẩu.')
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
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm
                    noValidate
                    validated={validated}
                    onSubmit={handleSubmit}
                  >
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Email" autoComplete="email"
                        required
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                      <CFormFeedback invalid>Vui lòng nhập email!</CFormFeedback>
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        required
                        value={pass}
                        onChange={(e) => setPass(e.target.value)}
                      />
                      <CFormFeedback invalid>Vui lòng nhập password!</CFormFeedback>
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit">
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Thi Trắc Nghiệm</h2>
                    <p>
                      Trang thi trắc nghiệm tiếng anh online!. Dành cho sinh viên
                      thuộc trường đại học.
                    </p>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
            <AppModalCustom visible={visible} handleSetVisible={handleSetVisible}
              mess={mess} isSuccess={isSuccess} pageRedirect={pageRedirect} />
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
