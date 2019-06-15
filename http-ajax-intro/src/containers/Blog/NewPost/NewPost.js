import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

import './NewPost.css';

class NewPost extends Component {
  state = {
    title: '',
    content: '',
    author: 'Phil',
    submitted: false,
    auth: true
  }
  
  componentDidMount() {
    if (!this.state.auth) {
      this.props.history.replace("/posts");
    }
    console.log(this.props);
    const query = new URLSearchParams(this.props.location.search);
    for (let param of query.entries()) {
      console.log(param);
    }
    console.log(this.props.location.hash);
  }
    
  postDataHandler = () => {
    const data = {
      title: this.state.title,
      body: this.state.content,
      author: this.state.author
    };
    
    axios.post('/posts', data)
    .then(response => {
      console.log(response);
      this.props.history.push("/posts");
      //this.props.history.replace("/posts");
      //this.setState({
      //  submitted: true
      //});
    })
    .catch(error => {
      alert(error.response.status);
    });
  }

  render () {
    const redirect = this.state.submitted ? <Redirect to="/posts" /> : null;
    return (
      <div className="NewPost">
        {redirect}
        <h1>Add a Post</h1>
        <label>Title</label>
        <input type="text" value={this.state.title} onChange={(e) => this.setState({title: e.target.value})} />
        <label>Content</label>
        <textarea rows="4" value={this.state.content} onChange={(e) => this.setState({content: e.target.value})} />
        <label>Author</label>
        <select value={this.state.author} onChange={(e) => this.setState({author: e.target.value})}>
          <option value="Phil">Phil</option>
          <option value="Bill">Bill</option>
          <option value="Markus">Markus</option>
        </select>
        <button onClick={this.postDataHandler}>Add Post</button>
      </div>
    );
  }
}

export default NewPost;