import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
  state = {
    loadedPost: null
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return !this.state.loadedPost || nextProps.match.params.id !== this.state.loadedPost.id;
  }
  
  componentDidMount() {
    console.log(this.props);
    
    let loadedPostId = null;
    if (this.state.loadedPost) {
      loadedPostId = this.state.loadedPost.id;
    }
    
    if (this.props.match.params.id && this.props.match.params.id !== loadedPostId) {
      axios.get('/posts/' + this.props.match.params.id)
        .then(response => {
          this.setState({loadedPost: response.data})
        })
        .catch(error => {
          alert(error.response.status);
        });
    }
  }
  
  deletePostHandler = () => {
    axios.delete('/posts/' + this.props.match.params.id)
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      alert(error.response.status);
    });
  }
  
  render () {
    let post = <p style={{textAlign: "center"}}>Please select a Post!</p>;
    if (this.state.loadedPost) {
      post = (
        <div className="FullPost">
          <h1>{this.state.loadedPost.title}</h1>
          <p>{this.state.loadedPost.body}</p>
          <div className="Edit">
            <button className="Delete" onClick={this.deletePostHandler}>Delete</button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;