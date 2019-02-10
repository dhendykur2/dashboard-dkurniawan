import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

function convertDate(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
}

class UserPost extends Component {
  constructor(props) {
    super(props);
    this.deletePost = this.deletePost.bind(this);
    this.state = {
      id: props.match.params.id,
      tag: props.match.params.tag ? props.match.params.tag : '',
      posts: []
    }
  }
  componentDidMount() {
    //console.log(this.children);
    const isAuthenticated = Cookies.get('UID');
    if(!isAuthenticated){
        this.props.history.push('/login');
    }
    Axios.get(`http://localhost:5000/post/by/${this.state.id}`, {
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
  deletePost(id) {
    const isAuthenticated = Cookies.get('UID');
    if(!isAuthenticated) {
        this.props.history.push('/login');
    }
    const decode = jwt_decode(Cookies.get('UID'));
    const postedBy = decode.user.id;
    //console.log(id);
    Axios.delete(`http://localhost:5000/post/${id}`, postedBy)
    .then(response => {
        if(response) {
            console.log(response);
            this.props.history.push(`/user/${this.state.id}`)
        }
    })
    .catch((error) => {
        console.log(error);
    })
  }
  updatePost() {
      
  }
  postTable(){
    //console.log(this.state.posts);
    if(this.state.posts !== null) {
      return this.state.posts.map((object, i) => {
        return (
          <div className="card" style={{width: "50rem"}}>
          <div className="card-body">
            <h5 className="card-title"><Link to ={`/post/${object.id}`}>{object.title}</Link></h5>
            <h6 className="card-subtitle mb-2 text-muted">posted at:{convertDate(object.createdAt)}</h6>
            <h6 className="card-subtitle mb-2 text-muted">posted by: {object.User.name}</h6>
            <p className="card-text">{object.description}</p>
            <a onClick={() => this.deletePost(object.id)} href="#" style={{marginRight: "4px", color: "red"}}>DELETE</a>
            <Link onClick={() => this.updatePost(object.id)} to={`/update-post/${object.id}`} style={{marginRight: "4px", color: "green"}}>UPDATE</Link>
            <br/>
            <a href="#" className="card-link">{
              object.Tags && object.Tags.map(obj => 
                <Link to={`/tag/${obj.name}`} style={{marginRight: "4px"}} className="nav-item">{obj.name}</Link>)
            }</a>
          </div>
        </div>
        )
      })
    }
    
  }
  
  render() {
    return (
      <div className="container">
      <h2>
      {Cookies.get('UID') ? <Link to="/create-post">Create Post</Link> : null}
      </h2>
        <div className="row">
        {
          this.postTable()
        }
          {/* {/*Cookies.get('UID') ? this.postTable() : null*/
            //this.postTable()
          } 
        </div>
      </div>
    );
  }
}

export default UserPost;

//component