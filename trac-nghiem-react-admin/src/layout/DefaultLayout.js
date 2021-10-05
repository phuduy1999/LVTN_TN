import React from 'react';
import { AppContent, AppFooter, AppHeader, AppSidebar } from '../components/index';


const DefaultLayout = (props) => {
  const { handleLogout } = props;
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader handleLogout={handleLogout} />
        <div className="body flex-grow-1 px-3">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
