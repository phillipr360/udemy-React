import React from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../Backdrop/Backdrop';
import PropTypes from 'prop-types';

const modal = (props) => (
  <Aux>
    <Backdrop show={props.show} hideHandler={props.hideModalHandler} />
    <div 
      className={classes.Modal} 
      style={{
        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
      }}
    >
      {props.children}
    </div>
  </Aux>
);

modal.propTypes = {
  show: PropTypes.bool.isRequired,
  hideModalHandler: PropTypes.func.isRequired
};

export default modal;