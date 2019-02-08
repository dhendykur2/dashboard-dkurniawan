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
                <div className="card" style={{width: "50rem"}}>
          <div className="card-body">
            <h5 className="card-title">{object.title}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{convertDate(object.createdAt)}</h6>
            <p className="card-text">{object.description}</p>
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