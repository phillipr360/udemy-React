import React, {Component} from 'react';

const wrappedClass = (WrappedComponent, className) => {
	return class extends Component {
		render() {
			return (
			  <div className={className}>
		      <WrappedComponent {...this.props} />
		    </div>
		  )
		}
	}
	
	//return (props) => (
	//	<div className={className}>
	//	  <WrappedComponent {...props} />
	//	</div>
	//)
}

export default wrappedClass;