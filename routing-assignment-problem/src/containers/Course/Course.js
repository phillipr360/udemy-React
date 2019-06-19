import React, { Component } from 'react';

class Course extends Component {
  componentDidMount() {
    console.log(this.props);
  }
  
  render () {
    let title = "Course Title";
    if (this.props.location.search) {
      const params = this.props.location.search.split("?")[1].split("&");
      for (let param of params) {
        let key = param.split("=")[0];
        if (key === "title") {
          title = decodeURI(param.split("=")[1]);
          break;
        }
      }
    }
    return (
      <div>
        <h1>{title}</h1>
        <p>You selected the Course with ID: {this.props.match.params.id}</p>
      </div>
    );
  }
}

export default Course;