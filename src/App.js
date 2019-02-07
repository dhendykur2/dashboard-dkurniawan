import React, { Component} from 'react';
import logo from './logo.svg';
import './App.css';
import home from '../src/views/home';
import about from '../src/views/about';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from '../src/redux/store';
import counter from '../src/views/counter';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={home}/>
            <Route exact path="/counter" component={counter}/>
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
