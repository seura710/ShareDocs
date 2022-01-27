import React, { Component } from 'react'
import axios from 'axios';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

export default class Registration extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            password_confirmation: "",
            registrationErrors: ""
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    handleSubmit(event) {
        const { email, password, password_confirmation } = this.state

        axios.post("http://localhost:8001/registrations", {
            user: {
                email: email, 
                password: password,
                password_confirmation: password_confirmation
            }
        },
        { withCredentials: true }
        ).then(response => {
            if(response.data.status === 'created'){
            this.props.handleSuccessfulAuth(response.data);
            } 
        }).catch(error => {
            console.log("registration error", error);
        })
        event.preventDefault();
    }
    render() {
        return (
                <form onSubmit={this.handleSubmit}>
                    <div className="form-inner">
                <input type="email" name="email" placeholder="Email" value={this.state.email} 
                autoComplete="username" onChange={this.handleChange} required/>

                <input type="password" name="password" placeholder="Password" value={this.state.password} autoComplete="new-password" onChange={this.handleChange} required/>

                <input type="password" name="password_confirmation" placeholder="Password confirmation" value={this.state.password_confirmation} 
                autoComplete="new-password" onChange={this.handleChange} required/>
                <button type="submit"><AppRegistrationIcon/></button>
                </div>
                </form>
        );
    }
}
