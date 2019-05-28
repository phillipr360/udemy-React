import React from 'react';
import classes from './BuildControl.css';
import PropTypes from 'prop-types';

const buildControl = (props) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.More}
      onClick={props.added}
    >
      Add
    </button>
    <button 
      className={classes.Less}
      onClick={props.removed}
      disabled={props.disabled}
    >
      Remove
    </button>
  </div>
);

buildControl.propTypes = {
  disabled: PropTypes.bool,
  label: PropTypes.string.isRequired,
  added: PropTypes.func.isRequired,
  removed: PropTypes.func.isRequired,
};

export default buildControl;