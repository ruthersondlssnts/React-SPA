import axios from 'axios';
import React from 'react';
import {BrowserRouter as  Router, Route, Switch } from 'react-router-dom';
import AuthLayout from './layouts/auth/AuthLayout';
import MasterLayout from './layouts/dashboard/MasterLayout';

axios.defaults.baseURL="http://127.0.0.1:8000";
axios.defaults.headers.post['Content-Type']="application/json";
axios.defaults.headers.post['Accept']="application/json";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <Router>
        <Switch>     
          <Route path="/employee">
            <MasterLayout></MasterLayout> 
          </Route>
           <Route path="/unit">
            <MasterLayout></MasterLayout>
          </Route>  
          <Route path="/role">
            <MasterLayout></MasterLayout>
          </Route>  
          <Route path="/assign-role">
            <MasterLayout></MasterLayout>
          </Route>  
          <Route path="/user/change-password">
            <MasterLayout></MasterLayout>
          </Route>  
          <Route path="/user/edit-account">
            <MasterLayout></MasterLayout>
          </Route>  
          <Route path="/user/view-profile">
            <MasterLayout></MasterLayout>
          </Route>  
          <Route path="/login">
            <AuthLayout></AuthLayout>
          </Route>
          <Route path="/register">
            <AuthLayout></AuthLayout>
          </Route>
          <Route path="/" exact>
            <AuthLayout></AuthLayout>
          </Route>
        </Switch>
      </Router> 
    </div>
  );
}

export default App;
