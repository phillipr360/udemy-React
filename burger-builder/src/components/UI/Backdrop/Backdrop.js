import React from 'react';
import classes from './Backdrop.css';
import PropTypes from 'prop-types';

const backdrop = (props) => (
  props.show ? <div className={classes.Backdrop} onClick={props.hideHandler}></div> : null
);

backdrop.propTypes = {
  hideHandler: PropTypes.func.isRequired
};

export default backdrop;