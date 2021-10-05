import React, { Component, useEffect, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './scss/style.scss'
import loginApi from 'src/api/loginApi';
import AppModalCustom from 'src/components/AppModalCustom';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const ChangePassword = React.lazy(() => import('./views/pages/changePassword/ChangePassword'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App = () => {
  const [visible, setVisible] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [mess, setMess] = useState(false)
  const pageRedirect = '/login';

  const handleLogout = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;
    loginApi.logout({
      refreshToken: user.refreshToken,
    })
      .then(function (response) {
        localStorage.removeItem("user");

        setVisible(true);
        setIsSuccess(true);
        setMess('Đăng xuất thành công!')

      })
      .catch(function (error) {
        console.log(error)
        localStorage.removeItem("user");

        setVisible(true);
        setIsSuccess(true);
        setMess('Đăng xuất thất bại! ' + error)
      });
  }

  const handleSetVisible = () => {
    setVisible(false);
  }

  return (
    <BrowserRouter>
      <React.Suspense fallback={loading}>
        <Switch>
          <Route
            exact
            path="/login"
            name="Login Page"
            render={(props) => <Login {...props} />} />
          <Route
            exact
            path="/change-password"
            name="Change Password"
            render={(props) => <ChangePassword {...props} />} />
          <Route
            exact
            path="/404"
            name="Page 404"
            render={(props) => <Page404 {...props} />} />
          <Route
            exact
            path="/500"
            name="Page 500"
            render={(props) => <Page500 {...props} />} />
          <Route
            path="/"
            name="Home"
            render={(props) => <DefaultLayout {...props} handleLogout={handleLogout} />} />
        </Switch>
      </React.Suspense>
      <AppModalCustom visible={visible} handleSetVisible={handleSetVisible}
        mess={mess} isSuccess={isSuccess} pageRedirect={pageRedirect} />
    </BrowserRouter>
  )
}

export default App
