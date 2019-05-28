import React, { Component } from 'react';
import classes from './Layout.css';

import Aux from '../../hoc/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
  state = {
    showSideDrawer: false
  }
  
  showSideDrawHandler = (show) => {
    this.setState({showSideDrawer: show});
  }
  
  toggleSideDrawHandler = () => {
    this.setState((prevState) => {
      return {showSideDrawer: !prevState.showSideDrawer}
    });
  }
  
  render() {
    return (
      <Aux>
        <Toolbar
          sideDrawerHandler={this.toggleSideDrawHandler}
        />
        <SideDrawer 
          show={this.state.showSideDrawer}
          closedHandler={() => this.showSideDrawHandler(false)}
        />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    );
  }
}

export default Layout;