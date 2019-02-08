import React, { Component } from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';



function convertDate(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
}

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: props.match.params.id,
      post: []
    }
  }
  componentDidMount(){
    Axios.get(`http://localhost:5000/post/${this.state.postId}`, {
      responseType: 'json'
    }).then(response => {
      console.log(response.data)
      this.setState({ post: response.data });
    }).catch(error => {
      console.log(error);
    })
  }

  postDetail(){
    if(this.state.post !== null) {
      //const object = this.state.post;
      const title = this.state.post.title;
      const description = this.state.post.description;
      const postedAt = this.state.post.createdAt;
      console.log(this.state.post.User);
      //const name = this.state.post.User;
      return (
        <div className="col-lg-8">
          
          <h2>{title}</h2>
          <h3>{}</h3>
          <p className="lead">{convertDate(postedAt)}</p>

          <p className="lead">{description}</p>
        </div>
      );
    }
  }
  render() {
      return (
        <div className="container">
          <h1>
            <Link to="/">BACK</Link>
          </h1>
          <h2>{this.postDetail()}</h2>
          </div>
      );
  }
}

export default Post;