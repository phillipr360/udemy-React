import React from 'react';
import Aux from '../../hoc/Aux';
import webpack from './Cockpit.css';

const cockpit = (props) => {
	const btnClasses = props.show ? [webpack.Button, webpack.Red] : [webpack.Button];
  const classes=[];
  if (props.len <= 2) {
    classes.push(webpack.red); // classes = ['red']
  }
  if (props.len <= 1) {
    classes.push(webpack.bold); // classes = ['red', 'bold']
  }
  
	return (
		<Aux>
			<h1>{props.appTitle}</h1>
			<p className={classes.join(' ')}>This is really working!</p>
			<button
				className={btnClasses.join(' ')}
				onClick={props.clicked}
			>
				{props.show ? "Hide" : "Show"} Persons
			</button>
			<button onClick={props.login}>Log In</button>
		</Aux>
	);
};

export default cockpit;