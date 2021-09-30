import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";

function Login() {
    const history = useHistory();
    const [loginInput,setLogin] = useState({
        name:'',
        password:'',
        error_list:[],
        error_summary:''
    });

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setLogin({
            ...loginInput,
            [name]:value}
        );
    }

   
    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            name: loginInput.name,
            password:loginInput.password,
        }

        axios.get('/sanctum/csrf-cookie',data).then(res =>{
            axios.post('/api/v1/login',data).then(res =>{
               localStorage.setItem('auth_token',res.data.token);
               localStorage.setItem('auth_name',res.data.user.name);
               var roles = res.data.roles.map(function(val) {
                return val.name;
              }).join(',');
                localStorage.setItem('auth_roles',roles);
                swal("Success","Logged In Succesfully");
                history.push("/");
            }).catch(error=>{
                if (error.response) {
                    setLogin({
                        ...loginInput,
                        error_list:error.response.data.errors??[],
                        error_summary:error.response.data.message
                    });
                    
                }
            });
        });

    };

    return (
    <div className="col-lg-5">
        <div className="card shadow-lg border-0 rounded-lg mt-5">
            <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
            <div className="card-body">
                <section>{loginInput.error_summary}</section>
                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <input className="form-control" id="inputName" name="name" onChange={handleInput} value={loginInput.name} type="text" placeholder="Username" />
                        <label htmlFor="inputName">Username</label>
                        <span>{loginInput.error_list.name}</span>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" id="inputPassword" type="password" name="password" onChange={handleInput} value={loginInput.password} placeholder="Password" />
                        <label htmlFor="inputPassword">Password</label>
                        <span>{loginInput.error_list.password}</span>
                    </div>
                    {/* <div className="form-check mb-3">
                        <input className="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                        <label className="form-check-label" for="inputRememberPassword">Remember Password</label>
                    </div> */}
                    <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                        {/* <a className="small" href="password.html">Forgot Password?</a> */}
                        <button className="btn btn-dark" href="index.html">Login</button>
                    </div>
                </form>
            </div>
            {/* <div className="card-footer text-center py-3">
                <div className="small"><a href="register.html">Need an account? Sign up!</a></div>
            </div> */}
        </div>
    </div>
    );
  }
  
  export default Login;
  