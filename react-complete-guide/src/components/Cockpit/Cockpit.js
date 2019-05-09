import React from 'react';
import webpack from './Cockpit.css';

const cockpit = (props) => {
	const btnClass = props.show ? webpack.Red : null;
  const classes=[];
  if (props.len <= 2) {
    classes.push(webpack.red); // classes = ['red']
  }
  if (props.len <= 1) {
    classes.push(webpack.bold); // classes = ['red', 'bold']
  }
  
	return (
		<div className={webpack.Cockpit}>
			<h1>{props.appTitle}</h1>
			<p className={classes.join(' ')}>This is really working!</p>
			<button
				className={btnClass}
				onClick={props.clicked}
			>
				{props.show ? "Hide" : "Show"} Persons
			</button>
		</div>
	);
};

export default cockpit;