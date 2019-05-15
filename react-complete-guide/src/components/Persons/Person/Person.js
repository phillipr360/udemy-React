import React, { Component } from 'react';
import PropTypes from 'prop-types';

import webpack from './Person.css';
import Aux from '../../../hoc/Aux';
//import WithClass from '../../../hoc/WithClass';
import wrappedClass from '../../../hoc/wrappedClass';
import { AuthContext } from '../../../containers/App';

class Person extends Component {
	constructor(props) {
		super(props);
		this.inputElement = React.createRef();
		console.log(`[Person.js] object ${props.name} inside constructor`, props);
	}
	
	componentWillMount() {
		console.log(`[Person.js] object ${this.props.name} inside componentWillMount`);
	}
	
	componentDidMount() {
		console.log(`[Person.js] object ${this.props.name} inside componentDidMount`);
		//if (this.props.index === 0) {
		//	this.inputElement.focus();
		//  this.inputElement.current.focus();
		//}
	}
	
	componentWillReceiveProps(newProps) {
		console.log(`Update: [Person.js] object ${newProps.name} will receive props inside componentWillReceiveProps`, newProps);
	}
	
	shouldComponentUpdate(newProps, newState) {
		const shouldUpdate = (newProps.name !== this.props.name || newProps.index !== this.props.index);
		console.log(`Update: [Person.js] object ${newProps.name} inside shouldUpdate returns ${shouldUpdate}`, newProps, newState);
		return shouldUpdate;
	}
	
	componentWillUpdate(newProps, newState) {
		console.log(`Update: [Person.js] object ${newProps.name} inside componentWillUpdate`, newProps, newState);
	}
	
	componentDidUpdate() {
		console.log(`Update: [Person.js] object ${this.props.name} inside componentDidUpdate`);
	}
	
	componentWillUnmount() {
		console.log(`Destroying [Person.js] object ${this.props.name} inside componentWillUnmount`);
	}
	
	focusInput() {
		this.inputElement.current.focus();
	}
	
	render() {
		console.log(`[Person.js] object ${this.props.name} inside render`);
		
  	//return [
  	//  <p key="1" onClick={this.props.clickHandler}>I'm {this.props.name} and I'm {this.props.age} years old.</p>,
  	//  <p key="2">{this.props.children}</p>,
  	//  <input key="3" type="text" value={this.props.name} onChange={this.props.changed}/>
  	//];
		
  	return (
  		<Aux>
  		  <AuthContext.Consumer>
  		    {auth => auth ? <p>Authenticated</p> : null}
  		  </AuthContext.Consumer>
  			<p onClick={this.props.clickHandler}>I'm {this.props.name} and I'm {this.props.age} years old.</p>
  			<p>{this.props.children}</p>
  			<input
  			  // ref={(elem) => {this.inputElement = elem}}
  			  ref={this.inputElement}
  			  type="text" value={this.props.name} 
  			  onChange={this.props.changed}
  			/>
  		</Aux>
  	);
  }
}

Person.propTypes = {
	index: PropTypes.number,
	name: PropTypes.string,
	age: PropTypes.number,
	clickHandler: PropTypes.func,
	changed: PropTypes.func,
	children: PropTypes.node
};

export default wrappedClass(Person, webpack.Person);
