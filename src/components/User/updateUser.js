import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Axios from 'axios';
import {NotificationContainer, NotificationManager}from 'react-notifications';


class UpdateUser extends Component {
    constructor(props) {
        super(props);
        this.onChangeConfirm = this.onChangeConfirm.bind(this);
        this.onChangeNew = this.onChangeNew.bind(this);
        this.onChangeOld = this.onChangeOld.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = { 
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            error: '',
            id: props.match.params.id
        }
    }
    componentWillMount() {
        const isAuthenticated = Cookies.get('UID');
        if(!isAuthenticated){
            this.props.history.push('/');
        }
    }
    onChangeOld(e) {
        this.setState({ oldPassword: e.target.value });
    }
    onChangeNew(e) {
        this.setState({ newPassword: e.target.value });
    }
    onChangeConfirm(e) {
        this.setState({ confirmPassword: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        const password = {
            oldPassword: this.state.oldPassword,
            newPassword: this.state.newPassword
        };
        if(!password) {
            this.setState({
                error: true
            })
        }  
        if(password.newPassword !== password.confirmPassword) {
            this.setState({
                error: true
            })
        }
        Axios.put(`http://localhost:5000/user/${this.state.id}`, password)
        .then((res) => {
            if(res.data.update) {
                this.props.history.push(`/user/${this.state.id}`);
            }
            this.setState({
                error: res.data.message
            })
        })
        .then(() => {
            this.setState({
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
                error: ''
            });
        })
        .catch(error => {
            console.log(error);
        }); 

    }
    render() { 
        return ( 
            <div className="container">
                <h2>Change Password</h2>
                <form onSubmit={this.onSubmit} className="form-signin">
                <div className="form-group col-md-4">
                    { this.state.error ? (<label style={{ color: "red" }}>New Password & confirm Password must be same</label>) : '' }
                    </div>
                    <div className="form-group col-md-4">
                        <label>Old Password</label>
                        <input type="password" name="name" className="form-control" required onChange={this.onChangeOld}/>
                    </div> 
                    <div className="form-group col-md-4">
                        <label>New Password</label>
                        <input type="password" name="email" className="form-control" required onChange={this.onChangeNew}/>
                    </div> 
                    <div className="form-group col-md-4">
                        <label>Confirm New Password</label>
                        <input type="password" className="form-control" name="password" required onChange={this.onChangeConfirm}/>
                    </div>
                    <div className="form-group col-md-4">
                        <input type="submit" className="btn-primary" value="Change Password"/>
                    </div>
                </form>
            </div>
         );
    }
}
 
export default UpdateUser;