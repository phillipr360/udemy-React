import React from 'react';
import classes from './Toolbar.css';

import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import Toggler from '../SideDrawer/Toggler/Toggler';


const toolbar = (props) => (
  <header className={classes.Toolbar}>
    <Toggler clicked={props.sideDrawerHandler} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavItems />
    </nav>
  </header>
);

export default toolbar;