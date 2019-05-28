import React from 'react';
import classes from './NavItems.css';
import PropTypes from 'prop-types';

import NavItem from './NavItem/NavItem';

const navItems = (props) => (
  <ul className={classes.NavItems}>
    <NavItem link={props.link || "/"} active>
      BurgerBuilder
    </NavItem>
    <NavItem link={props.link || "/"}>
      Checkout
    </NavItem>
  </ul>
);

navItems.propTypes = {
  link: PropTypes.string
};

export default navItems;