import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const errorColor = {
    color: 'red',
};
class Login extends Component {

    constructor(props) {
        super(props);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
            error: false,
        }
    }
    componentWillMount() {
        const isAuthenticate = Cookies.get('UID')
        if(isAuthenticate) {
            this.props.history.push('/');
        }
    }
    onChangeEmail(e) {
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
        if(!user) {
            this.setState({
                error: true
            });
        }
        axios.post('http://localhost:5000/signin', user)
        .then(res => {
            if (res.data.login) {
                Cookies.set('UID',res.data.token);
                this.props.history.push('/')
            }
            this.setState({
                error: true
            });
        })
        
        this.setState({
            email: '',
            password: '',
            error: false
        });
    }

    render () {
        
        return (
            <div className="container">
                <h2>Login</h2>
                <form onSubmit={this.onSubmit} className="form-signin">
                    <div className="form-group col-md-4">
                    { this.state.error ? (<label style={errorColor}>Wrong Email/Password</label>) : '' }
                    </div>
                    <div className="form-group col-md-4">
                    <label>Email</label>
                    <input type="email" name="email" className="form-control" required onChange={this.onChangeEmail} />
                    </div> 
                    <div className="form-group col-md-4">
                    <label>Password</label>
                    <input type="password" className="form-control" name="password" required onChange={this.onChangePassword} />
                    </div>
                    <div className="form-group col-md-4">
                        <input type="submit" className="btn-primary" value="Login"/>
                        <br/>
                        <br/>
                        <button className="btn-warning"><Link to={'/register'}>Register</Link></button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;