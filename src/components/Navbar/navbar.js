import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

class Navbar extends Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <ul className="navbar-nav mr-auto">
              <li>
                <Link to={'/'} className="nav-link">Home</Link>
              </li>
              <li>
                <Link to={'/about'} className="nav-link">About</Link>
              </li>
              <li>
                  <Link to={'/login'} className="nav-link">Login</Link>
              </li>
            </ul>
            </nav>
        );
    }
}

export default Navbar;