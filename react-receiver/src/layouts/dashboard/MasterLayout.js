import '../../assets/css/styles.css';
import '../../assets/js/scripts';
import React from 'react';
import EmployeeList from '../../components/employee/EmployeeList';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Router,Route,Switch } from 'react-router-dom';
import UnitList from '../../components/unit/UnitList';
import RoleList from '../../components/role/RoleList';
import AssignRole from '../../components/role/AssignRole';
import ChangePassword from '../../components/user/ChangePassword';
import EditAccount from '../../components/user/EditAccount';
import ViewProfile from '../../components/user/ViewProfile';

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
                            <Route path="/employee">
                                <EmployeeList/>
                            </Route>
                            <Route path="/unit">
                                <UnitList/>
                            </Route>
                            <Route path="/role">
                                <RoleList/>
                            </Route>
                            <Route path="/assign-role">
                                <AssignRole/>
                            </Route>
                            <Route path="/user/change-password">
                                <ChangePassword/>
                            </Route>
                            <Route path="/user/edit-account">
                                <EditAccount/>
                            </Route>
                            <Route path="/user/view-profile">
                                <ViewProfile/>
                            </Route>
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
