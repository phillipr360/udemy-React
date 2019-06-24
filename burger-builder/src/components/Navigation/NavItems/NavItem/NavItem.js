import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavItem.css';
import PropTypes from 'prop-types';

const navItem = (props) => (
  <li className={classes.NavItem}>
    <NavLink
      to={props.link}
      exact={props.exact}
      activeClassName={classes.active}
    >{props.children}</NavLink>
  </li>
);

navItem.propTypes = {
  link: PropTypes.string.isRequired,
  exact: PropTypes.bool
};

export default navItem;