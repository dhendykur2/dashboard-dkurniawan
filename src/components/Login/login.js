import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

class Login extends Component {

    constructor(props) {
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: ''
        }
    }
    onChangeEmail(e) {
        console.log(e.target.value)
        this.setState({
            email: e.target.value
        });
    }
    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    onSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        console.log(user)
        axios.post('http://localhost:5000/signin', user)
        .then(res => {
            console.log(Cookies.get('session'));
            if (res.data) {
                this.props.history.push('/')
            }
        });
        
        this.setState({
            email: '',
            password: ''
        });
    }

    render () {
        return (
            <div className="container">
                <h2>Login</h2>
                <form onSubmit={this.onSubmit} className="form-signin">
                    <div className="form-group col-md-4">
                    <label>Email</label>
                    <input type="text" name="email" className="form-control" required onChange={this.onChangeEmail} />
                    </div> 
                    <div className="form-group col-md-4">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" required onChange={this.onChangePassword} />
                    </div>
                    <div className="form-group col-md-4">
                        <input type="submit" className="btn-primary" value="Login"/>
                        <button className="btn-warning"><Link to={'/register'}>Register</Link></button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;