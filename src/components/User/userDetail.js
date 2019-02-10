import React, { Component } from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';

class UserDetail extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            id: props.match.params.id,
            users: []
        }
    }

    componentDidMount() {
        Axios.get(`http://localhost:5000/user/${this.state.id}`, this.state.id)
        .then((res) => {
            console.log(res);
            this.setState({ users: res.data })
        })
    }

    detailUser() {
        const name = this.state.users.name;
        const email = this.state.users.email;
        return (
            <div className="col-lg-8">
                <h2><Link to={`/user-post/${this.state.id}`}>My Post</Link></h2>
                <p className="lead">Name: {name}</p>
                <p className="lead">Email: {email}</p>
                <Link to={`/change-password/${this.state.id}`}>change password</Link>
            </div>
        );
    }

    render() {
        return (
            <div className="container">
                {this.detailUser()}
            </div>
        );
    }
}

export default UserDetail;