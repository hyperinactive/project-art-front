import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

import { UserProvider } from './context/userContext/UserProvider';
import { NavigationProvider } from './context/navigationContext/NavigationProvider';
import { InboxProvider } from './context/inboxContext/InboxProvider';

import NavBar from './components/NavBar';
import Home from './components/routes/Home/Home';
import Register from './components/routes/Register';
import Login from './components/routes/Login';
import UserRoute from './components/routes/UserRoute';
import SinglePost from './components/routes/Post/Post';
import NotFoundPage from './components/routes/NotFoundPage';
import Projects from './components/routes/Projects/Projects';
import Settings from './components/routes/Settings';
import UserProfile from './components/routes/UserProfile';
import Inbox from './components/routes/Inbox/Inbox';
import Project from './components/routes/Projects/Project/Project';
import ProjectForm from './components/routes/Projects/ProjectForm';
import Connect from './components/routes/Connect';
import CropComponent from './components/shared/CropComponent';

const App = () => (
  <UserProvider>
    <BrowserRouter>
      {/* bootstrap container basically */}
      <Container className="appContainer">
        <NavigationProvider>
          <NavBar />
          <InboxProvider>
            <Container className="appContainer__innerContainer">
              <Switch>
                <Route exact path="/" component={Home} />
                <UserRoute exact path="/register" component={Register} />
                <UserRoute exact path="/login" component={Login} />
                <Route exact path="/posts/:postID" component={SinglePost} />
                <Route exact path="/projects" component={Projects} />
                <Route exact path="/connect" component={Connect} />
                <Route
                  exact
                  path="/projects/createProject"
                  component={ProjectForm}
                />
                <Route exact path="/projects/:projectID" component={Project} />
                {/* TODO: user settings and user profile */}
                <Route exact path="/settings/:userID" component={Settings} />

                <Route exact path="/user/:userID" component={UserProfile} />
                <Route exact path="/inbox" component={Inbox} />

                <Route exact path="/404" component={NotFoundPage} />
                <Route exact path="/testCrop" component={CropComponent} />

                <Route component={NotFoundPage} />
              </Switch>
            </Container>
          </InboxProvider>
        </NavigationProvider>
      </Container>
    </BrowserRouter>
  </UserProvider>
);

export default App;
