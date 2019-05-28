import React from 'react';
import classes from './Toggler.css';
import PropTypes from 'prop-types';

const toggler = (props) => (
  <div className={classes.Toggler} onClick={props.clicked}>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

toggler.propTypes = {
  clicked: PropTypes.func.isRequired
};

export default toggler;