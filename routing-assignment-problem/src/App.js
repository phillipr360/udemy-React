import React, { Component } from 'react';
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom';

import Courses from './containers/Courses/Courses';
import Users from './containers/Users/Users';

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className="App">
          <header>
            <nav>
              <Link to="/">Users</Link> | <Link to="/courses">Courses</Link>
            </nav>
          </header>
          <Switch>
            <Route path="/" exact component={Users} />
            <Redirect from="/users" to="/" />
            <Route path="/courses" component={Courses} />
            <Redirect from="/my-courses" to="/courses" />
            <Route render={() => <h1>Not Found</h1>} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
