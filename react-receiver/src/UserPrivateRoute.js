import { Route,Redirect } from "react-router-dom";
import MasterLayout from "./layout/MasterLayout";

function UserPrivateRoute({...rest}) {
  return (
    <Route {...rest}
        render={({props,location})=>{
            return localStorage.getItem('auth_token')?
            (<MasterLayout {...props} />):
            (<Redirect to="/login" />);
            // (<Redirect to={{pathname:"/login",state:{from:location}}} />);
        }}

    />
  );
}

export default UserPrivateRoute;
