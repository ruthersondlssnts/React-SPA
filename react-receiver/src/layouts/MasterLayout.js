import '../assets/css/styles.css';
import '../assets/js/scripts';
import React from 'react';
import Footer from './Footer';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
function MasterLayout() {
  return (
    <div className="sb-nav-fixed">
         <Topbar/>
        <div id="layoutSidenav">
            <div id="layoutSidenav_nav">
                <Sidebar/>
                
            </div>
            <div id="layoutSidenav_content">
                <main>
                    <div className="container-fluid px-4">
                        <h1 className="mt-4">Dashboard</h1>
                        <ol className="breadcrumb mb-4">
                            <li className="breadcrumb-item active">Dashboard</li>
                        </ol>
                       
                    </div>
                </main>
                <Footer/>
            </div>
        </div>
    </div>
  );
}

export default MasterLayout;
