import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

import { UserProvider } from './context/UserProvider';

import NavBar from './components/NavBar';
import Home from './components/routes/Home/Home';
import Register from './components/routes/Register/Register';
import Login from './components/routes/Login/Login';
import UserRoute from './components/routes/UserRoute';
import SinglePost from './components/routes/SinglePost';
import NotFoundPage from './components/routes/NotFoundPage';
import ProjectGroup from './components/routes/ProjectGroup';

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
          <Route exact path="/posts/:postID" component={SinglePost} />
          <Route exact path="/projects" component={ProjectGroup} />
          {/* (*) covers all calls to nonexistent pages */}
          <Route path="*" component={NotFoundPage} />
        </Switch>
      </Container>
    </BrowserRouter>
  </UserProvider>
);

export default App;
