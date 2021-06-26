/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Form, Grid, Icon, Header } from 'semantic-ui-react';

import { UserContext } from '../../context/UserProvider';

import { REGISTER_USER } from '../../graphql/index';
import { NavigationContext } from '../../context/NavigationProvider';

const Register = (props) => {
  const { setActiveItem } = useContext(NavigationContext);

  // gets the job done but too repetative
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [isPassVisible, setIsPassVisible] = useState(false);

  const context = useContext(UserContext);

  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    // update will trigger if everything's went smoothly
    // returns proxy result
    update: (_, result) => {
      context.login(result.data.register);
      // take us to the home page if register succeeded
      props.history.push('/');
      setActiveItem('home');
    },
    // it expects some variables to be sent for mutations
    variables: {
      username: state.username,
      email: state.email,
      password: state.password,
      confirmPassword: state.confirmPassword,
    },
    // handle errors
    onError: (err) => {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  // prevent the reload and invoke addUser()
  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };

  return (
    <div className="register">
      <Grid
        textAlign="center"
        style={{ height: '70vh' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" textAlign="center" className="headline">
            Sign me up!
          </Header>
          <Form
            size="large"
            onSubmit={handleSubmit}
            noValidate
            // the loading spinner class
            className={loading ? 'loading' : ''}
          >
            {/* <Segment stacked> */}
            <Form.Input
              className="themeForm"
              fluid
              name="username"
              placeholder="username"
              type="text"
              error={errors.username || errors.usernameInUse}
              value={state.username}
              onChange={handleChange}
            />
            <Form.Input
              className="themeForm"
              fluid
              name="email"
              placeholder="some.mail@com"
              type="email"
              error={errors.email || errors.emailInUse}
              value={state.email}
              onChange={handleChange}
            />
            <Form.Input
              className="themeForm"
              fluid
              name="password"
              placeholder="password"
              type={isPassVisible ? 'text' : 'password'}
              error={errors.password}
              value={state.password}
              onChange={handleChange}
            >
              <input />
              <Button
                type="button"
                onClick={() => setIsPassVisible(!isPassVisible)}
              >
                <Icon
                  name={isPassVisible ? 'eye' : 'eye slash'}
                  style={{ margin: 0 }}
                />
              </Button>
            </Form.Input>
            <Form.Input
              className="themeForm"
              fluid
              name="confirmPassword"
              placeholder="confirm password"
              type={isPassVisible ? 'text' : 'password'}
              error={errors.confirmPassword}
              value={state.confirmPassword}
              onChange={handleChange}
            />

            <Button
              fluid
              size="large"
              type="submit"
              color="orange"
              animated="fade"
              tabIndex="0"
            >
              <div className="visible content">Looks good?</div>
              <div className="hidden content">Sign me up!</div>
            </Button>
            {/* </Segment> */}
          </Form>
          {/* {Object.keys(errors).length > 0 && (
          <Message
            error
            header="Errors with the submission"
            list={Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          />
        )} */}
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Register;
