import React from 'react';
function Sidebar() {
    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                        <div className="sb-sidenav-menu-heading">User</div>
                        <a className="nav-link" href="index.html">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Profile
                        </a>
                        <a className="nav-link" href="index.html">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Change Password
                        </a>
                        <a className="nav-link" href="index.html">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Edit Account
                        </a>
                        <div className="sb-sidenav-menu-heading">Manager</div>
                        <a className="nav-link" href="index.html">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Employees
                        </a>
                        <a className="nav-link" href="index.html">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                           Units
                        </a>
                        <div className="sb-sidenav-menu-heading">Admin</div>
                        <a className="nav-link" href="index.html">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                            Register Employee
                        </a>
                        <a className="nav-link" href="index.html">
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                           Assign Role
                        </a>
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
