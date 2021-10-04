import React from 'react';
import { Link } from 'react-router-dom';
function Sidebar() {
    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                        <div className="sb-sidenav-menu-heading">User</div>
                        <Link className="nav-link" to="/dashboard">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Dashboard
                        </Link>
                        {/* <Link className="nav-link" to="/user/change-password">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Change Password
                        </Link>
                        <Link className="nav-link" to="/user/edit-account">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Edit Account
                        </Link> */}
                        <div className="sb-sidenav-menu-heading">Manager</div>
                        <Link className="nav-link" to="/employee">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Employees
                        </Link>
                        <Link className="nav-link" to="/unit">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                           Units
                        </Link>
                        <div className="sb-sidenav-menu-heading">Admin</div>
                        <Link className="nav-link" to="/user">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                           Users
                        </Link>
                        {/* <Link className="nav-link" to="/register">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Register Employee
                        </Link>
                        <Link className="nav-link" to="/assign-role">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                           Assign Role
                        </Link> */}
                    </div>
            </div>
            <div className="sb-sidenav-footer">
                <div className="small">Logged in as:</div>
                    Start Bootstrap
            </div>
        </nav>

    );
}

export default Sidebar;
