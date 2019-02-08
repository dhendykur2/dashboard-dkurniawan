import React, { Component } from 'react';
import Axios from 'axios';
import {Link} from 'react-router-dom';


function convertDate(inputFormat) {
  function pad(s) { return (s < 10) ? '0' + s : s; }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
}

class PostByTag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tag: props.match.params.tag,
            posts: []
        }
    }
    componentDidMount() {
        Axios.get(`http://localhost:5000/post/tag/${this.state.tag}`, {
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
                    <Link to={`/tag/${obj.name}`} onClick={this.onClickTag} style={{marginRight: "4px"}} className="nav-item">{obj.name}</Link>)
                  }
              </div>
            )
          })
        }
        
      }
    render() {
        return (
            <div className="container">
                <h1>
                    <Link to="/">BACK</Link>
                </h1>
                <div className="row">
                {
                    this.postTable()
                }
                </div>
            </div>
        );
    }
}

export default PostByTag;