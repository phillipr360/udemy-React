import React, { Component } from 'react';
import axiosInstance from '../../../axios';
//import { Link } from 'react-router-dom'; 

import Post from '../../../components/Post/Post';
import './Posts.css';

class Posts extends Component {
  state = {
    posts: [],
    error: false
  }
  
  componentDidMount() {
    console.log(this.props);
    axiosInstance.get('/posts')
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: 'Phil'
          }
        });
        this.setState({posts: updatedPosts})
      })
      .catch(error => {
        this.setState({error: true});
      });
  }
  
  postSelectedHandler = (id) => {
    this.props.history.push({pathname: '/' + id});
  }
  
  render () {
    let posts = <p style={{textAlign: "center"}}>Something Went Wrong!</p>;
    if (!this.state.error) {
      posts = <p>No Posts Yet</p>;
    }
    if (this.state.posts.length > 0) {
      posts = this.state.posts.map(post => {
        return (
          //<Link to={'/' + post.id} key={post.id}>
            <Post
              key={post.id}
              title={post.title}
              author={post.author}
              //{...this.props}
              //match={this.props.match}
              clicked={() => this.postSelectedHandler(post.id)}
            />
          //</Link>
        );
      });
    }
      
    return (
      <section className="Posts">
        {posts}
      </section>
    );
  }
}

export default Posts;