import React from 'react';
import {BrowserRouter as  Router, Route, Switch } from 'react-router-dom';
import AuthLayout from './layouts/auth/AuthLayout';
import MasterLayout from './layouts/dashboard/MasterLayout';


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
