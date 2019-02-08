import React, { Component} from 'react';
//import './App.css';


import home from '../src/views/home';
import about from '../src/views/about';

import Navbar from '../src/components/Navbar/navbar';
import login from '../src/components/Login/login';
import register from '../src/components/Register/register';
import post  from '../src/components/Post/post';
import createPost from '../src/components/Post/createPost';
import postByTag from '../src/views/postByTag';


import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from '../src/redux/store';
import UserDetail from './components/User/userDetail';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Navbar />
            <Switch>
              <Route exact path="/" component={home}/>
              <Route exact path="/tag/:tag" component={postByTag}/>
              <Route exact path="/about" component={about}/>
              <Route exact path="/login" component={login}/>
              <Route exact path="/register" component={register}/>
              <Route exact path="/post/:id" component={post}/>
              <Route exact path="/create-post" component={createPost}/>
              <Route exact path="/user/:id" component={UserDetail}/>
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
