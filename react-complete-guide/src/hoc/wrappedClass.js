import React, {Component} from 'react';

const wrappedClass = (WrappedComponent, className) => {
	const WrappedClass = class extends Component {
		render() {
			return (
			  <div className={className}>
		      <WrappedComponent ref={this.props.forwardedRef} {...this.props} />
		    </div>
		  )
		}
	}
	
	return React.forwardRef((props, ref) => {
		return <WrappedClass {...props} forwardedRef={ref}/>
	});
	
	//return (props) => (
	//	<div className={className}>
	//	  <WrappedComponent {...props} />
	//	</div>
	//)
}

export default wrappedClass;