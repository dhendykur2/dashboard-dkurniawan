import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import Axios from 'axios';

class Navbar extends Component {
    constructor(props) {
        super(props);
        
        //console.log(decode);
        this.state = {
            id: '',
            name: ''
        }
    }
    componentWillMount() {
        const isAuthenticated = Cookies.get('UID');
        let decode = '';
        let currentId = '';

        if(isAuthenticated){
            decode = jwt_decode(Cookies.get('UID'));
            currentId = decode.user.id;
        }
        this.setState({
            id: currentId || '',
            name: isAuthenticated ? decode.user.name : ''
        })
    }
    onLogout() {
        Cookies.remove('UID');
    }
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <ul className="navbar-nav mr-auto">
              <li>
                <Link to={'/'} className="nav-link">Home</Link>
              </li>
              <li>
                <Link to={'/about'} className="nav-link">About</Link>
              </li>
              <li>
                  {Cookies.get('UID') ? <Link to={`/user/${this.state.id}`} className="nav-link">user:{this.state.name}</Link> :null }
              </li>
              <li>
                  {Cookies.get('UID') ? <Link to={'/login'} onClick={this.onLogout} className="nav-link">Logout</Link> : <Link to={'/login'} className="nav-link">Login</Link>}
              </li>
            </ul>
            </nav>
        );
    }
}

export default Navbar;