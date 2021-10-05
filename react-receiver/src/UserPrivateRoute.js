import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Route,Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { AuthContext } from "./App";
import Loading from "./layout/Loading";
import MasterLayout from "./layout/MasterLayout";

function UserPrivateRoute({...rest}) {
  let context=useContext(AuthContext);
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    let path = window.location.pathname;
    if(path.includes('employee')||path.includes('unit')){
      axios.get('/api/v1/checkAdminManagerAuthorization').then(res=>{
        console.log('isautho',res);
        setLoading(false);
      }).catch(function (error) {
        console.log('isnotautho',error);
        setLoading(false);
        history.push('/403');
      })
      
    }
    else if(path.includes('user')){
      axios.get('/api/v1/checkAdminAuthorization').then(res=>{
        console.log('isautho',res);
        setLoading(false);
      }).catch(function (error) {
        console.log('isnotautho',error);
        setLoading(false);
        history.push('/403');
      })
    }
    else{
      setLoading(false);
    }
    return () => {
      setAuthorized(false);
    }
  },[])

  if(loading){
    return <Loading></Loading>
  }
  return (
    
    <Route {...rest}
        render={({props,location})=>{
            // return localStorage.getItem('auth_token')?
            return context.authenticated?
            (<MasterLayout {...props} />):
            (<Redirect to="/login" />);
            // (<Redirect to={{pathname:"/login",state:{from:location}}} />);
        }}

    />
  );
}

export default UserPrivateRoute;
