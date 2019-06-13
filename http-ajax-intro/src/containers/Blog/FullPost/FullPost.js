import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {
  state = {
    loadedPost: null
  }
  
  componentDidMount() {
    console.log(this.props);
    this.loadData(this.props.match.params.id);
  }
  
  shouldComponentUpdate(nextProps, nextState) {
    return !this.state.loadedPost || parseInt(nextProps.match.params.id) !== parseInt(this.state.loadedPost.id);
  }
  
  componentDidUpdate() {
    this.loadData(parseInt(this.props.match.params.id));
  }
  
  loadData(postId) {
    let loadedPostId = null;
    if (this.state.loadedPost) {
      loadedPostId = parseInt(this.state.loadedPost.id);
    }
    
    if (postId && postId !== loadedPostId) {
      axios.get('/posts/' + postId)
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