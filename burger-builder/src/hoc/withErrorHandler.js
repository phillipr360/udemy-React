import React, { Component } from 'react';

import Modal from '../components/UI/Modal/Modal';
import Aux from './Aux';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    }
    
    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        this.setState({error: null});
        return req;
      });
      this.resInterceptor = axios.interceptors.response.use(res => res, error => {
        this.setState({error: error});
      });
    }
    
    componentWillUnmount() {
      console.log("Unmounting...", this.reqInterceptor, this.resInterceptor);
      
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }
    
    render() {
      return (
        <Aux>
          <Modal
            show={!!this.state.error}
            hideModalHandler={() => this.setState({error: null})}
          >
            {this.state.error ? this.state.error.message : "Something went wrong!"}
          </Modal>
          <WrappedComponent {...this.props} />
        </Aux>
      );
    }
  }
}

export default withErrorHandler;