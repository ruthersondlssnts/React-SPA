import axios from "axios";
import { useState } from "react";

function Register() {
    const [registerInput,setRegister] = useState({
        name:'',
        email:'',
        password:'',
        confirm_password:'',
        roles:[]
    });

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setRegister({
            ...registerInput,
            [name]:value}
        );
    }

    const handleCheckbox = e => {
        let newRoles = [...registerInput.roles, e.target.value];
        if (registerInput.roles.includes(e.target.value)) {
            newRoles = newRoles.filter(role => role !== e.target.value);
        }
        setRegister({
            ...registerInput,
            roles: newRoles
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            name: registerInput.name,
            email:registerInput.email,
            password:registerInput.password,
            roles: registerInput.roles
        }

        axios.get('/sanctum/csrf-cookie',data).then(res =>{
            axios.post('/api/v1/register',data).then(res =>{
            
            });
        });

    };

    return (
        <div className="col-lg-7">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
                <div className="card-header"><h3 className="text-center font-weight-light my-4">Create Account</h3></div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                            <div className="col-md-12">
                                <div className="form-floating mb-3 mb-md-0">
                                    <input autoComplete="on" name="name" className="form-control" value={registerInput.name} onChange={handleInput} type="text" placeholder="Enter your first name" />
                                    <label htmlFor="inputFirstName">First name</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-floating mb-3">
                            <input autoComplete="on" name="email" className="form-control" value={registerInput.email} onChange={handleInput} type="email" placeholder="name@example.com" />
                            <label htmlFor="inputEmail">Email address</label>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="form-floating mb-3 mb-md-0">
                                    <input autoComplete="on" name="password" className="form-control" value={registerInput.password} onChange={handleInput}  type="password" placeholder="Create a password" />
                                    <label htmlFor="inputPassword">Password</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-floating mb-3 mb-md-0">
                                    <input autoComplete="on" name="confirm_password" className="form-control" value={registerInput.confirm_password} onChange={handleInput}   type="password" placeholder="Confirm password" />
                                    <label htmlFor="inputPasswordConfirm">Confirm Password</label>
                                </div>
                            </div>
                        </div>
                        <div className="form-check">
                        <input className="form-check-input"  id="chckUser" name="chckUser" type="checkbox" value="1" id="" onChange={handleCheckbox}/>
                        <label className="form-check-label" htmlFor="chckUser">
                           User
                        </label>
                        </div>
                        <div className="form-check">
                        <input className="form-check-input" id="chckManager" name="chckManager" type="checkbox" value="2" id="" onChange={handleCheckbox}/>
                        <label className="form-check-label" htmlFor="chckManager">
                           Manager
                        </label>
                        </div>
                        <div className="form-check">
                        <input className="form-check-input" id="chckAdmin" name="chckAdmin" type="checkbox" value="3" id="" onChange={handleCheckbox}/>
                        <label className="form-check-label" htmlFor="chckAdmin">
                           Admin
                        </label>
                        </div>
                        <div className="mt-4 mb-0">
                            <div className="d-grid"><button className="btn btn-dark btn-block" >Create Account</button></div>
                        </div>
                    </form>
                </div>
                {/* <div className="card-footer text-center py-3">
                    <div className="small"><Link to="/login">Have an account? Go to login</Link></div>
                </div> */}
            </div>
        </div>
    );
  }
  
  export default Register;
  