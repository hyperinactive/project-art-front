import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

import { UserProvider } from './context/UserProvider';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import UserRoute from './components/UserRoute';
import SinglePost from './components/SinglePost';

const App = () => (
  <UserProvider>
    <BrowserRouter>
      {/* bootstrap container basically */}
      <Container>
        {/* regardless of the page we're on, the Menu bar will be shown */}
        <NavBar />
        <Switch>
          <Route exact path="/" component={Home} />
          <UserRoute exact path="/register" component={Register} />
          <UserRoute exact path="/login" component={Login} />
          <Route exact path="/posts/postID" component={SinglePost} />
        </Switch>
      </Container>
    </BrowserRouter>
  </UserProvider>
);

export default App;
