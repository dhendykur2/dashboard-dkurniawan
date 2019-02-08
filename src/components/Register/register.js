import React, { Component } from 'react';
import Axios from 'axios';
import Cookies from 'js-cookie';
//import {Link} from 'react-router-dom';

const errorColor = {
    color: 'red',
};

class Register extends Component {

    constructor(props) {
        console.log(props)
        super(props);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            name: '',
            email: '',
            password: '',
            error: ''
        }
    }
    componentWillMount() {
        const isAuthenticated = Cookies.get('UID');
        if(isAuthenticated){
            this.props.history.push('/');
        }
    }
    onChangeEmail(e) {
        this.setState({ email: e.target.value });
    }
    onChangeName(e) {
        this.setState({ name: e.target.value });
    }
    onChangePassword(e) {
        this.setState({ password: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        };
        Axios.post('http://localhost:5000/signup', user)
        .then(res => {
            console.log(res.data.register);
            if (res.data.register) {
                this.props.history.push('/login')
            }
            this.setState({
                error: res.data.message
            })
        })
        .then(() => {
            // check if the result is a success or not
            this.setState({
                name: '',
                email: '',
                password: '',
                error: false
            })
        })
    }

    render() {
        return (
            <div className="container">
                <h2>Register</h2>
                <form onSubmit={this.onSubmit} className="form-signin">
                <div className="form-group col-md-4">
                    { this.state.error ? (<label style={errorColor}>Email Already exists</label>) : '' }
                    </div>
                    <div className="form-group col-md-4">
                        <label>Name</label>
                        <input type="text" name="name" className="form-control" required onChange={this.onChangeName}/>
                    </div> 
                    <div className="form-group col-md-4">
                        <label>Email</label>
                        <input type="email" name="email" className="form-control" required onChange={this.onChangeEmail}/>
                    </div> 
                    <div className="form-group col-md-4">
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" required onChange={this.onChangePassword}/>
                    </div>
                    <div className="form-group col-md-4">
                        <input type="submit" className="btn-primary" value="Register"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default Register;