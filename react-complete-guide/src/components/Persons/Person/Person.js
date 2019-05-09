import React, { Component } from 'react';
import webpack from './Person.css';

class Person extends Component {
	constructor(props) {
		super(props);
		console.log('[Person.js] inside constructor', props);
	}
	
	componentWillMount() {
		console.log('[Person.js] inside componentWillMount');
	}
	
	componentDidMount() {
		console.log('[Person.js] inside componentDidMount');
	}
	
	render() {
		console.log('[Person.js] inside render');
		
  	return (
  		<div className={webpack.Person} >
  			<p onClick={this.props.clickHandler}>I'm {this.props.name} and I'm {this.props.age} years old.</p>
  			<p>{this.props.children}</p>
  			<input type="text" value={this.props.name} onChange={this.props.changed}/>
  		</div>
  	);
  }
}

export default Person;
