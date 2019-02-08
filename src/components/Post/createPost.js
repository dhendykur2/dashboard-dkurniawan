import React, { Component } from 'react';
import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import Axios from 'axios';

class CreatePost extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTag = this.onChangeTag.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        
        this.state = {
            title: '',
            description: '',
            tag: '',
        }
    }
    componentWillMount() {
        const isAuthenticate = Cookies.get('UID');
        if(!isAuthenticate) {
            this.props.history.push('/login');
        }
    }
    onChangeTitle(e) {
        this.setState({ title: e.target.value });
    }
    onChangeDescription(e) {
        this.setState({ description: e.target.value });
    }
    onChangeTag(e) {
        this.setState({ tag: e.target.value });
    }
    onSubmit(e) {
        e.preventDefault();
        const token = Cookies.get('UID');
        var decoded = jwt_decode(token);
        const post = {
            title: this.state.title,
            description: this.state.description,
            tag: this.state.tag,
            postedBy: decoded.user.id
        };
        console.log(decoded);
        console.log(decoded.user.id);
        console.log(post);
        Axios.post('http://localhost:5000/post', post)
        .then((res) => {
            console.log(res.data);
            this.props.history.push('/');
        })
        .then(() => {
            this.setState({
                title: '',
                description: '',
                tag: ''
            });
        })
        .catch(error => {
            console.log(error);
        });
        
    }

    render() {
        return (
            <div className="container">
                <h2>Create New Post</h2>
                <form onSubmit={this.onSubmit} className="form-signin">
                <div className="form-group col-md-4">
                    </div>
                    <div className="form-group col-md-4">
                        <label>Title</label>
                        <input type="text" name="name" className="form-control" required onChange={this.onChangeTitle}/>
                    </div> 
                    <div className="form-group col-md-4">
                        <label>Description</label>
                        <input type="text" name="email" className="form-control" required onChange={this.onChangeDescription}/>
                    </div> 
                    <div className="form-group col-md-4">
                        <label>Tag ex:(coding,programming)</label>
                        <input type="type" className="form-control" name="password" required onChange={this.onChangeTag}/>
                    </div>
                    <div className="form-group col-md-4">
                        <input type="submit" className="btn-primary" value="Post"/>
                    </div>
                </form>
            </div>
        );
    }
}

export default CreatePost;