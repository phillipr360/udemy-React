import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';
import asyncComponent from '../../hoc/asyncComponent';

import Posts from './Posts/Posts';
//import FullPost from './FullPost/FullPost';
//import NewPost from './NewPost/NewPost';
import './Blog.css';

const AsyncNewPost = asyncComponent(() => {
  return import('./NewPost/NewPost');
});

class Blog extends Component {
  state = {
    auth: true
  }
  
  render () {
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/posts"
                  exact
                  activeClassName="my-active"
                  activeStyle={{
                    color: "#FA932F",
                    textDecoration: "underline"
                  }}
                >
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink to={{
                  pathname: "/new-post",
                  hash: "#submit",
                  search: "?quick-submit=true"
                }}>
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        {/*<Route path="/" exact render={() => <h1>Home</h1>} />*/}
        {/*<Route path="/" exact component={Posts} />*/}
        <Switch>
          {this.state.auth ? <Route path="/new-post" exact component={AsyncNewPost} /> : null}  
          <Route path="/posts" component={Posts} />
          <Redirect from="/" to="/posts" />
          {/*<Route path="/:id" exact component={FullPost} />*/}
          <Route render={() => <h1>Not Found</h1>} />
        </Switch>
      </div>
    );
  }
}

export default Blog;