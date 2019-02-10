import React, { Component } from 'react';
import Cookies from 'js-cookie';
import Axios from 'axios';
import jwt_decode from 'jwt-decode';

class UpdatePost extends Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTag = this.onChangeTag.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = { 
            id: props.match.params.id,
            post: [],
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
        //console.log(isAuthenticate);
        const decoded = jwt_decode(isAuthenticate);
        Axios.get(`http://localhost:5000/post/${this.state.id}`)
        .then((res) => {
            if(res.data) {
                this.setState({
                    post: res.data
                })
            }
            if(decoded.user.id !== this.state.post.postedBy) {
                this.props.history.push('/');
            }
        })
        .then(() => {
            this.setState({
                title: this.state.post.title,
                description: this.state.post.description
            });
            let tags = '';
            this.state.post.Tags.map(obj => tags = tags + ',' + obj.name);
            this.setState({
                tag: tags.slice(1)
            });
        })
        .catch(error => {
            console.log(error);
        });
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
        Axios.put(`http://localhost:5000/post/${this.state.id}`, post)
        .then((res) => {
            console.log(res.data);
            this.props.history.push(`/user-post/${post.postedBy}`);
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
                <h2>Update Post</h2>
                <form onSubmit={this.onSubmit} className="form-signin">
                <div className="form-group col-md-4">
                    </div>
                    <div className="form-group col-md-4">
                        <label>Title</label>
                        <input type="text" name="name" className="form-control" required onChange={this.onChangeTitle} value={this.state.title}/>
                    </div> 
                    <div className="form-group col-md-4">
                        <label>Description</label>
                        <input type="text" name="email" className="form-control" required onChange={this.onChangeDescription} value={this.state.description}/>
                    </div> 
                    <div className="form-group col-md-4">
                        <label>Tag ex:(coding,programming)</label>
                        <input type="type" className="form-control" name="password" required onChange={this.onChangeTag} value={this.state.tag}/>
                    </div>
                    <div className="form-group col-md-4">
                        <input type="submit" className="btn-primary" value="Post"/>
                    </div>
                </form>
            </div>
         );
    }
}
 
export default UpdatePost;