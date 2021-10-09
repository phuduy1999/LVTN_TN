import { CContainer, CSpinner } from '@coreui/react'
import React, { Suspense, useEffect, useState } from 'react'
import { Switch } from 'react-router-dom'
// routes config
import routes from '../routes'
import ProtectedRoute from './ProtectedRoute'
import InfoUserLogin from 'src/_infoUser';


const AppContent = (props) => {
  const { isLogin } = props;
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (InfoUserLogin()) {
      setIsAuth(true);
    }
    else setIsAuth(false);
  })

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Switch>
          {routes.map((route, idx) => {
            return (
              route.component && (
                <ProtectedRoute
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  component={route.component}
                  isAuth={isLogin}
                />
              )
            )
          })}
          {/* <Redirect from="/" to="/dashboard" /> */}
        </Switch>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
