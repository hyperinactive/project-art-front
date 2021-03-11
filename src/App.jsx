import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

import { UserProvider } from './context/UserProvider';
import { NavigationProvider } from './context/NavigationProvider';

import NavBar from './components/NavBar';
import Home from './components/routes/Home/Home';
import Register from './components/routes/Register';
import Login from './components/routes/Login';
import UserRoute from './components/routes/UserRoute';
import SinglePost from './components/routes/SinglePost';
import NotFoundPage from './components/routes/NotFoundPage';
import ProjectGroups from './components/routes/ProjectGroups';
import Feed from './components/routes/Feed';
import Settings from './components/routes/Settings';
import Profile from './components/routes/Profile';
import ProjectGroupForm from './components/ProjectGroupForm';
import ProjectGroup from './components/routes/ProjectGroup';

const App = () => (
  <UserProvider>
    <BrowserRouter>
      {/* bootstrap container basically */}
      <Container>
        {/* regardless of the page we're on, the Menu bar will be shown */}
        {/* TODO: maybe make it so the navigation isn't shown on 404 page */}
        <NavigationProvider>
          <NavBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <UserRoute exact path="/register" component={Register} />
            <UserRoute exact path="/login" component={Login} />
            <Route exact path="/posts/:postID" component={SinglePost} />
            <Route exact path="/projects" component={ProjectGroups} />
            <Route
              exact
              path="/projects/createProject"
              component={ProjectGroupForm}
            />
            <Route exact path="/projects/:projectID" component={ProjectGroup} />
            {/* TODO: user settings and user profile */}
            <Route exact path="/settings/:userID" component={Settings} />

            <Route exact path="/user/:userID" component={Profile} />
            {/* TODO: sub zero, north pole, no chance of any sun, winds holwing, freezing todo */}
            <Route exact path="/chat" component={Feed} />

            <Route exact path="/404" component={NotFoundPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </NavigationProvider>
      </Container>
    </BrowserRouter>
  </UserProvider>
);

export default App;
