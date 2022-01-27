import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from './Home';
import TextEditor from './TextEditor'
import axios from 'axios'
import React, { Component } from 'react'
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import VerifiedUserOutlinedIcon from '@mui/icons-material/VerifiedUserOutlined';

export default class App extends Component {

  constructor() {
    super();

    this.state = {
      loggedInStatus: <PersonOffOutlinedIcon/>,
      user: {}
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  
  checkLoginStatus() {
    axios.get("https://rocky-headland-80907.herokuapp.com/logged_in", { withCredentials: true }).then(response => {
      if (response.data.logged_in && this.state.loggedInStatus === "Please Login!"){
      this.setState({
        loggedInStatus: <VerifiedUserOutlinedIcon/>,
        user: response.data.user
      })
    } else if(!response.data.logged_in & this.state.loggedInStatus === <VerifiedUserOutlinedIcon/>) {
      this.setState({
        loggedInStatus: <PersonOffOutlinedIcon/>,
        user: {}
      })
    }
    })
    .catch(error => {
      console.log("check login error", error);
    });
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  handleLogout() {
    this.setState({
      loggedInStatus: <PersonOffOutlinedIcon/>,
      user: {}
    })
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: <VerifiedUserOutlinedIcon/>, 
      user: data
    })
  }

  render() {
    return (
            <div className = 'app'>
      <BrowserRouter>
      <Switch>
        <Route exact path = {'/'} 
        render = {props => (
          <Home {...props} handleLogout={this.handleLogout} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus}/>
        )}/>
        <Route exact 
        path = {'/texteditor'} 
        render = {props => (
          <TextEditor {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.loggedInStatus} />
        )}/>
      </Switch>
      </BrowserRouter>
    </div>
    );
  }
}

