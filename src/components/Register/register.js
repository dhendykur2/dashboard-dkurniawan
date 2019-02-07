import React, { Component } from 'react';
//import {Link} from 'react-router-dom';

class Register extends Component {
    render() {
        return (
            <div className="container">
                <h2>Register</h2>
                <form method="POST" className="form-signin">
                    <div className="form-group col-md-4">
                        <label>Name</label>
                        <input type="text" name="name" className="form-control" required/>
                    </div> 
                    <div className="form-group col-md-4">
                        <label>Email</label>
                        <input type="text" name="email" className="form-control" required/>
                    </div> 
                    <div className="form-group col-md-4">
                        <label>Password</label>
                        <input type="password" className="form-control" name="password" required/>
                    </div>
                    <div className="form-group col-md-4">
                        <button type="submit" className="btn-primary">Register</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Register;