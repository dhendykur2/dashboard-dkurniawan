import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import PostTable from '../components/Post/post';
import Axios from 'axios';
import Cookies from 'js-cookie';

function convertDate(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
}

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tag: props.match.params.tag ? props.match.params.tag : '',
      posts: []
    }
  }
  componentDidMount() {
    //console.log(this.children);
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
    // if (this.state.tag === '') {
      
    // } else {
    //   Axios.get(`http://localhost:5000/post/tag/${this.state.tag}`, {
    //     responseType: 'json'
    //   })
    //   .then(response => {
    //     console.log(response.data)
    //     this.setState({ posts: response.data });
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
    // }
  }

  postTable(){
    //console.log(this.state.posts);
    if(this.state.posts !== null) {
      return this.state.posts.map((object, i) => {
        return (
          <div className="col-lg-8" key={object.id}>
            <Link to={`/post/${object.id}`}>
            <h1 className="mt-4">{object.title}</h1>
            </Link>
            <p className="lead">posted: {convertDate(object.createdAt)}</p>
            <p className="lead">Posted By: {object.User.name}</p>
              {
                object.Tags.map(obj=> 
                <Link to={`/tag/${obj.name}`} style={{marginRight: "4px"}} className="nav-item">{obj.name}</Link>)
              }
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

export default Home;

//component