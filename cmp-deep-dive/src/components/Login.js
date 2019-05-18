import React, { Component } from 'react';
import AuthContext from '../authContext';

class Login extends Component {
	static contextType = AuthContext;
	
	componentDidMount() {
		console.log(this.context);
	}
	
	render() {
		return (
		  <button onClick={this.context.toggleAuth}>
		    {this.context.isAuth ? 'Logout' : 'Login'}
		  </button>
		);
	}

}
export default Login;
