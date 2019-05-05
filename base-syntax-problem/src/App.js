import React, { Component } from 'react';
import UserInput from './User/UserInput';
import UserOutput from './User/UserOutput';

import './App.css';

class App extends Component {
  state = {
    username: "Phil R",
    defaultUser: "User"
  };

  changeUsernameHandler = (event) => {
    this.setState({
      username: event.target.value
    });
  }

  render() {
    const inputStyle = {
      backgroundColor: '#eee',
      border: '1px solid blue',
      padding: '10px',
      margin: '4px',
      width: '50%'
    }

    return (
      <div className="App">
        <h1>Base Syntax Assignment</h1>
        <UserInput username={this.state.username} style={inputStyle} changeUsernameHandler={this.changeUsernameHandler} />
        <UserOutput username={this.state.username}/>
        <UserOutput username={this.state.defaultUser}/>
      </div>
    );
  }
}

export default App;
