/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Button, Form, Grid, Icon, Header } from 'semantic-ui-react';

import useRegister from '../../utils/hooks/register';
import LoaderComponent from '../shared/LoaderComponent';

const Register = () => {
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  // don't really have much to do with the registration info
  // so I guess it makes sense to be separate from the state
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const [registerUser, { loading }] = useRegister(
    state.username,
    state.email,
    state.password,
    state.confirmPassword,
    setErrors
  );

  // prevent the reload and invoke addUser()
  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };

  return (
    <div className="register">
      {loading && <LoaderComponent />}
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
