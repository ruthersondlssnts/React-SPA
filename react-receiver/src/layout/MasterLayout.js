import '../assets/css/styles.css';
import React from 'react';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Redirect,Route,Switch } from 'react-router-dom';
import routes from '../routes/routes';
import { useState } from 'react';

export const RolesContext=React.createContext();

function MasterLayout() {
const [roles, setRoles] = useState(localStorage.getItem('auth_roles'));
  return (
    <RolesContext.Provider value={roles}>

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
                                <Redirect exact="true" from="/" to="/dashboard" />                          
                                <Redirect from="" to="/404" />                          
                            </Switch>
                        
                    </div>
                </main>
                <Footer/>
            </div>
        </div>
        
    </div>
    </RolesContext.Provider> 

  );
}

export default MasterLayout;
