import React, { Component} from 'react';
//import './App.css';


import home from '../src/views/home';
import about from '../src/views/about';

import Navbar from '../src/components/Navbar/navbar';
import login from '../src/components/Login/login';
import register from '../src/components/Register/register';

import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from '../src/redux/store';
import counter from '../src/views/counter';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Navbar />
            <Switch>
              <Route exact path="/" component={home}/>
              <Route exact path="/about" component={about}/>
              <Route exact path="/login" component={login}/>
              <Route exact path="/register" component={register}/>
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
