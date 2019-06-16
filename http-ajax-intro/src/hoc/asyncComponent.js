import React, { Component } from 'react';

const asyncComponent = (importComponent) => {
  return class extends Component {
    state = {
      component: null
    }
    
    componentDidMount() {
      importComponent()
        .then(cmp => {
          this.setState({
            component : cmp.default
          });
        });
    }
    
    render() {
      const C = this.state.component;
      console.log(C ? "LOADED ASYNC" : "LOADING...");
      return C ? <C {...this.props} /> : null;
    }
  }
}

export default asyncComponent;