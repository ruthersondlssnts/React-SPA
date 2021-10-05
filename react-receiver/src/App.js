import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {BrowserRouter as  Router, Redirect, Route, Switch } from 'react-router-dom';
import Login from './components/auth/Login';
import UserPrivateRoute from './UserPrivateRoute';
import Page403 from './components/errors/Page403';
import Page404 from './components/errors/Page404';
import Loading from './layout/Loading';

axios.defaults.baseURL="http://127.0.0.1:8000";
axios.defaults.headers.post['Content-Type']="application/json";
axios.defaults.headers.post['Accept']="application/json";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token? `Bearer ${token}`:'';
  return config;
});


export const AuthContext=React.createContext();
function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get('/api/v1/checkAuthentication').then(res=>{
      console.log('isauth',res);
      setAuthenticated(true);
      setLoading(false)
    }).catch(function (error) {
      console.log('isnotauth',error);
      setAuthenticated(false);
      setLoading(false)
  })
    
    return () => {
      setAuthenticated(false);
    }
  }, [])

  if(loading){
    return <Loading></Loading>
  }

  return (
    <div>
      <AuthContext.Provider value={{authenticated:authenticated,updateAuthenticated:setAuthenticated}}>
      <Router>
        <Switch>  
          <Route path="/403" component={Page403}/>
          <Route path="/404" component={Page404}/>
          <Route path="/login" exact={true} >
              {/* {localStorage.getItem('auth_token')? <Redirect to='/'/>: <Login/>} */}
              {authenticated? <Redirect to='/'/>: <Login/>}
          </Route> 
          <UserPrivateRoute path="/" />
          
          {/* <Route path="/" render={(props)=> <MasterLayout {...props}/>} /> */}
        </Switch>
      </Router> 
    </AuthContext.Provider>

    </div>
  );
}

export default App;
