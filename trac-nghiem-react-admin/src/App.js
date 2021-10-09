import React, { useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import loginApi from 'src/api/loginApi';
import AppModalCustom from 'src/components/AppModalCustom';
import './scss/style.scss';
import InfoUserLogin from 'src/_infoUser';

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
  const [isLogin, setIsLogin] = useState(false)
  const [mess, setMess] = useState(false)
  const pageRedirect = '/login';

  const handleLogout = () => {

    if (!InfoUserLogin()) return;
    loginApi.logout({
      refreshToken: InfoUserLogin().refreshToken,
    })
      .then(function (response) {
        localStorage.removeItem("user");

        setVisible(true);
        setIsSuccess(true);
        setMess('Đăng xuất thành công!')

        setIsLogin(false);
      })
      .catch(function (error) {
        console.log(error)
        localStorage.removeItem("user");

        setIsLogin(false);
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
            render={(props) => <Login {...props} setIsLogin={setIsLogin} />} />
          <Route
            exact
            path="/change-password"
            name="Change Password"
            render={(props) => {
              if (isLogin) {
                return <ChangePassword {...props} />
              }
              else {
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
              }
            }} />
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
            render={(props) => {
              if (isLogin) {
                return <DefaultLayout {...props} handleLogout={handleLogout} isLogin={isLogin} />
              }
              else {
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
              }
            }}
          />
        </Switch>
      </React.Suspense>
      <AppModalCustom visible={visible} handleSetVisible={handleSetVisible}
        mess={mess} isSuccess={isSuccess} pageRedirect={pageRedirect} />
    </BrowserRouter>
  )
}

export default App
