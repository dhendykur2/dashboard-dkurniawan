import React, { Component } from 'react';
import Axios from 'axios';

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
          
          <p className="lead">{name}</p>

          <p className="lead">{email}</p>
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