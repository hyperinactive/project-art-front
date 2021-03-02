import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';

const App = () => (
  <BrowserRouter>
    {/* bootstrap container basically */}
    <Container>
      {/* regardless of the page we're on, the Menu bar will be shown */}
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Container>
  </BrowserRouter>
);

export default App;
