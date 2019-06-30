import React, { Component } from 'react';

import './AddPerson.css';

class AddPerson extends Component {
  // name, age only matter to local UI input component
  // therefore, manage state locally, not via global redux
  state = {
    name: "",
    age: 0
  };
  
  changeName = (event) => {
    this.setState({name: event.target.value});
  }
  
  changeAge = (event) => {
    this.setState({age: event.target.value});
  }
  
  submitPerson = () => {
    const name = this.state.name;
    const age = parseInt(this.state.age);
    if (!name) {
      alert("Enter a name");
      return;
    }
    if (!age || age <=  0) {
      alert("Enter a valid age");
      return;
    }
    this.props.personAdded(name, age);
  }
  
  render () {
    return (
      <div className="AddPerson">
        <input type="text" placeholder="Name" onChange={this.changeName} value={this.state.name} />
        <input type="number" placeholder="Age" onChange={this.changeAge} value={this.state.age} />
        <button onClick={this.submitPerson}>Add Person</button>
      </div>
    );
  }
}

export default AddPerson;