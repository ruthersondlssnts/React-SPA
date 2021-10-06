import axios from 'axios';
import React, { useContext,useState } from 'react';
import { useHistory } from "react-router-dom";
import { AuthContext } from '../App';

function Topbar() {
    const history = useHistory();
    let context=useContext(AuthContext);

    const logoutSubmitHandler =(e)=>{
        e.preventDefault();

        axios.post('/api/v1/logout').then(res =>{
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_name');
            localStorage.removeItem('auth_roles');
            localStorage.removeItem('auth_employee');
            
            context.updateAuthenticated(false);
        });

    }
    const handleToggle =(e)=>{
        e.preventDefault();
        document.body.classList.toggle('sb-sidenav-toggled');
    }

    const username = localStorage.getItem('auth_name')
    return (
        <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
            <a className="navbar-brand ps-3" href="index.html">Start Bootstrap</a>
            <button className="btn btn-dark btn-sm order-1 order-lg-0 me-4 me-lg-0" onClick={handleToggle} href="#!"><i className="fas fa-bars"></i></button>
            <div className=" ms-auto me-0 me-md-3 my-2 my-md-0 text-white">
              Hi {username }
            </div>
            <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i className="fas fa-user fa-fw"></i></a>
                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                        <li><button className="dropdown-item" onClick={logoutSubmitHandler}>Logout</button></li>
                    </ul>
                </li>
            </ul>
        </nav>
  );
}

export default Topbar;
