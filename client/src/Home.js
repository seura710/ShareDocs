import React, { Component } from "react";
import Registration from './auth/Registration'
import Login from './auth/Login'
import axios from 'axios'
import LogoutIcon from '@mui/icons-material/Logout';
import SummarizeIcon from '@mui/icons-material/Summarize';

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }

    handleSuccessfulAuth(data) {
        this.props.handleLogin(data);
        this.props.history.push("/texteditor");
    }

    handleLogoutClick(){
        axios.delete("http://localhost:8001/logout", { withCredentials: true }).then(response => {
            this.props.handleLogout();
        }).catch(error => {
            console.log("logout error", error);
        });
    }

    render() {
        return (
                <div className="App">
                    <div className="form-home">
                    <h1>ShareDocs <SummarizeIcon/></h1>
                    <div className="box">
                    {this.props.loggedInStatus} 
                    <button onClick={() => this.handleLogoutClick()}><LogoutIcon/></button>
                    </div>
                    <Registration handleSuccessfulAuth={this.handleSuccessfulAuth}/>
                    <Login handleSuccessfulAuth={this.handleSuccessfulAuth}/>
                    </div>
                </div>
        );
    }
}