import React from 'react';
import classes from './SideDrawer.css';
import PropTypes from 'prop-types';

import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const sideDrawer = (props) => {
  let activeClasses = [classes.SideDrawer]
  if (props.show) {
    activeClasses.push(classes.Open);
  } else {
    activeClasses.push(classes.Close);
  }
  
  return (
    <Aux>
      <Backdrop show={props.show} hideHandler={props.closedHandler}/>
      <div className={activeClasses.join(' ')}>
        <div className={classes.Logo} >
          <Logo />
        </div>
        <nav>
          <NavItems />
        </nav>
      </div>
    </Aux>
  );
};

sideDrawer.propTypes = {
  show: PropTypes.bool.isRequired,
  closedHandler: PropTypes.func.isRequired
};

export default sideDrawer;