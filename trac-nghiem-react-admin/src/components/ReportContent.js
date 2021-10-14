import { CContainer, CSpinner } from '@coreui/react'
import React, { Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
// routes config
import routesReport from '../routesReport'


const ReportContent = (props) => {

  return (
    <CContainer lg>
      <Suspense fallback={<CSpinner color="primary" />}>
        <Switch>
          {routesReport.map((route, idx) => {
            return (
              route.component && (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  name={route.name}
                  render={(props) => (
                    <>
                      <route.component {...props} />
                    </>
                  )}
                />
              )
            )
          })}
        </Switch>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(ReportContent)
