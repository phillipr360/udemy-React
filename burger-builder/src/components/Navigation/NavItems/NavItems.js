import React from 'react';
import classes from './NavItems.css';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import NavItem from './NavItem/NavItem';

const navItems = (props) => (
  <ul className={classes.NavItems}>
    <NavItem link={"/"} exact>
      BurgerBuilder
    </NavItem>
    <NavItem link={"/orders"}>
      My Orders
    </NavItem>
  </ul>
);

navItems.propTypes = {
  link: PropTypes.string
};

export default withRouter(navItems);