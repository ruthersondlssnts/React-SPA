
import { Redirect,Route, Switch } from "react-router-dom";
import Login from "../../components/auth/Login";
import Register from "../../components/auth/Register";
import AuthFooter from "./AuthFooter";
function AuthLayout() {
 
  return (
    <div className="bg-dark">
    <div id="layoutAuthentication">
        <div id="layoutAuthentication_content">
            <main>
                <div className="container">
                    <div className="row justify-content-center">
                      <Switch>
                        <Route>
                            <Login/>
                        </Route>   
                        <Route path="/register">
                          <Register/>
                        </Route>
                      </Switch>
                      
                    </div>
                </div>
            </main>
        </div>
        <div id="layoutAuthentication_footer">
          <AuthFooter/>
           
        </div>
    </div>
</div>
  );
}

export default AuthLayout;
