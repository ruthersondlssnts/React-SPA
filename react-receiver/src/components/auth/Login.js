import axios from "axios";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert";
import { AuthContext } from "../../App";

function Login() {
    let context=useContext(AuthContext);
    const [btnPending, setBtnPending] = useState(false)
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
        setBtnPending(true);
        const data = {
            name: loginInput.name,
            password:loginInput.password,
        }

        axios.get('/sanctum/csrf-cookie',data).then(res =>{
            axios.post('/api/v1/login',data).then(res =>{
                console.log(res.data.user.employee)
               localStorage.setItem('auth_token',res.data.token);
               localStorage.setItem('auth_name',res.data.user.name);
               if(res.data.user.employee){
                localStorage.setItem('auth_employee',res.data.user.employee.id);
               }
               var roles = res.data.roles.map(function(val) {
                return val.name;
              }).join(',');
                localStorage.setItem('auth_roles',roles);
                swal("Success","Logged In Succesfully");
                context.updateAuthenticated(true);
                setBtnPending(false);
            }).catch(error=>{
                if (error.response) {
                    setLogin({
                        ...loginInput,
                        error_list:error.response.data.errors??[],
                        error_summary:error.response.data.message
                    });
                    setBtnPending(false);
                }
            });
        });

    };

    return (
   
        <div className="bg-dark">
        <div id="layoutAuthentication">
            <div id="layoutAuthentication_content">
                <main>
                    <div className="container">
                        <div className="row justify-content-center">
                        <div className="col-lg-5">
            <div className="card shadow-lg border-0 rounded-lg mt-5">
                <div className="card-header"><h3 className="text-center font-weight-light my-4">Login</h3></div>
                <div className="card-body">
                    <section  className="text-danger">{loginInput.error_summary}</section>
                    <form onSubmit={handleSubmit}>
                        <div className="form-floating mb-3">
                            <input className="form-control" id="inputName" name="name" onChange={handleInput} value={loginInput.name} type="text" placeholder="Username" />
                            <label htmlFor="inputName">Username</label>
                            <span  className="text-danger">{loginInput.error_list.name}</span>
                        </div>
                        <div className="form-floating mb-3">
                            <input className="form-control" id="inputPassword" type="password" name="password" onChange={handleInput} value={loginInput.password} placeholder="Password" />
                            <label htmlFor="inputPassword">Password</label>
                            <span className="text-danger">{loginInput.error_list.password}</span>
                        </div>
                        {/* <div className="form-check mb-3">
                            <input className="form-check-input" id="inputRememberPassword" type="checkbox" value="" />
                            <label className="form-check-label" for="inputRememberPassword">Remember Password</label>
                        </div> */}
                        <div className="d-flex align-items-center justify-content-between mt-4 mb-0">
                            {/* <a className="small" href="password.html">Forgot Password?</a> */}
                            {btnPending?
                                <button className="btn btn-dark" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm mx-1" role="status" ariaHidden="true"></span>
                                    Loading...
                                </button>
                                :
                                <button className="btn btn-dark" >Login</button>
                            }
                            
                        </div>
                    </form>
                </div>
                {/* <div className="card-footer text-center py-3">
                    <div className="small"><a href="register.html">Need an account? Sign up!</a></div>
                </div> */}
            </div>
        </div>
                        </div>
                    </div>
                </main>
            </div>
            <div id="layoutAuthentication_footer">
            <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                    <div className="text-muted">Copyright &copy; Your Website 2021</div>
                    <div>
                        <a href="#">Privacy Policy</a>
                        &middot;
                        <a href="#">Terms &amp; Conditions</a>
                    </div>
                </div>
            </div>
        </footer>
               
            </div>
        </div>
    </div>
     
    );
  }
  
  export default Login;
  