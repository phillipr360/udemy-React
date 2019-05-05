import React, { Component } from 'react';
import TextInput from './Text/TextInput';
import ValidateLength from './Text/ValidateLength';
import CharComponent from './Text/CharComponent';
import './App.css';

class App extends Component {
  state = {
    input: ['I', 'n', 'p', 'u', 't', ':'],
    minLength: 10,
  };

  changeInputHandler = (event) => {
    const letters = event.target.value.split('');
    this.setState({
      input: letters
    });
  }

  deleteLetterHandler = (index) => {
    const letters = [...this.state.input];
    letters.splice(index, 1);
    this.setState({input: letters});
  }


  render() {
    const inputStyle = {
      border: '1px solid blue',
      padding: '10px',
      margin: '4px',
      width: '50%'
    }

    const letters = (
        <div>
          {this.state.input.map((letter, index) => {
            return <CharComponent key={index} letter={letter} clickHandler={() => this.deleteLetterHandler(index)} />
          })}
        </div>
      );

    return (
      <div className="App">
        <h1>Char Component Assignment</h1>
        <TextInput value={this.state.input.join("")} style={inputStyle} changeInputHandler={this.changeInputHandler}/>
        <ValidateLength length={this.state.input.length} minLength={this.state.minLength}/>
        {letters}
      </div>
    );
  }
}

export default App;
