import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { RolesContext } from './MasterLayout';
function Sidebar() {
    let context=useContext(RolesContext);

    let admin = context.toLowerCase().includes("admin");
    let manager = context.toLowerCase().includes("manager");
    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                        <div className="sb-sidenav-menu-heading">User</div>
                        <Link className="nav-link" to="/dashboard">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Dashboard
                        </Link>
                        {(manager||admin) && 
                            <div className="manager">
                                <div className="sb-sidenav-menu-heading">Manager</div>
                                <Link className="nav-link" to="/employee">
                                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                    Employees
                                </Link>
                                
                                <Link className="nav-link" to="/unit">
                                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                Units
                                </Link>
                            </div>
                        }
                        {admin&& 
                            <div className="admin">
                                <div className="sb-sidenav-menu-heading">Admin</div>
                                <Link className="nav-link" to="/user">
                                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                    Users
                                </Link>
                            </div>
                        }
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
