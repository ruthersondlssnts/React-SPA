import '../assets/css/styles.css';
import '../assets/js/scripts';
import React from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Redirect,Route,Switch } from 'react-router-dom';
import routes from '../routes/routes';

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
                        {/* <h1 className="mt-4">Dashboard</h1>
                        <ol className="breadcrumb mb-4">
                            <li className="breadcrumb-item active">Dashboard</li>
                        </ol> */}

                        <Switch>
                            {routes.map((route,idx)=>{
                                return (
                                    route.component && (
                                        <Route
                                            key={idx}
                                            path={route.path}
                                            exact={route.exact}
                                            render={(props)=>(
                                                <route.component {...props} />
                                            )}
                                        />
                                    )
                                );
                            })}
                            <Redirect from="/" to="/dashboard" />                          
                        </Switch>
                    </div>
                </main>
                <Footer/>
            </div>
        </div>
        
    </div>
  );
}

export default MasterLayout;
