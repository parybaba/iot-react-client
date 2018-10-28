import React, { Component } from 'react';
import Auth from './containers/Auth/Auth';
import Layout from './components/Layout/Layout'
import classes from './App.css'
import {Switch,Route,Redirect,withRouter} from 'react-router-dom'
import Dashboard from './containers/Dashboard/Dashboard';
import Axios from 'axios';
import * as authAction from './store/actions/auth'
import {connect} from 'react-redux'

class App extends Component {
  
  
  render() {

    if(localStorage.getItem('token')!=null)
        authAction.checkToken();

    const routes = this.props.isAuthenticated ? 
      <Switch>
        <Route path="/" component={Dashboard} />
      </Switch>
      :
      <Switch>
        <Route path="/" component={Auth} />
      </Switch>
    
    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state=>{
  return { isAuthenticated : state.auth.isAuthenticated}
}

export default withRouter(connect(mapStateToProps)(App));