import axios from 'axios';
import React from 'react';
import {BrowserRouter as  Router, Redirect, Route, Switch } from 'react-router-dom';
import AuthLayout from './layouts/auth/AuthLayout';
import UserPrivateRoute from './UserPrivateRoute';

axios.defaults.baseURL="http://127.0.0.1:8000";
axios.defaults.headers.post['Content-Type']="application/json";
axios.defaults.headers.post['Accept']="application/json";
axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token? `Bearer ${token}`:'';
  return config;
});

function App() {
  return (
    <div>
      <Router>
        <Switch>  
          <Route path="/login" exact={true} >
              {localStorage.getItem('auth_token')? <Redirect to='/'/>: <AuthLayout/>}
          </Route> 
          <UserPrivateRoute path="/" />
          {/* <Route path="/" render={(props)=> <MasterLayout {...props}/>} /> */}
        </Switch>
      </Router> 
    </div>
  );
}

export default App;
