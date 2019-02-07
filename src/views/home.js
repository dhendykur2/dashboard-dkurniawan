import React, { Component } from 'react';
//import {Provider} from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import PostTable from '../components/Post/post';
import Axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }
  componentDidMount() {
    Axios.get('http://localhost:5000/post', {
      responseType: 'json'
    })
    .then(response => {
      console.log(response.data)
      this.setState({ posts: response.data });
    })
    .catch((error) => {
      console.log(error);
    });
  }
  postTable(){
    console.log(this.state.posts);
    if(this.state.posts !== null) {
      return this.state.posts.map((object, i) => {
        return (
          <tr key={i}>
            <td>{object.id}</td>
            <td>{object.title}</td>
            <td>{object.description}</td>
            <td>{object.createdAt}</td>
          </tr>
        )
      })
    }
    
  }
  render() {
    return (
      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <td>id</td>
              <td>postedby</td>
              <td>title</td>
              <td>createdAt</td>
            </tr>
          </thead>
          <tbody>
            {this.postTable()}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Home;

//component