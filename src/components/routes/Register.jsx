/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Form, Grid, Icon, Header } from 'semantic-ui-react';

import { UserContext } from '../../context/UserProvider';

import { REGISTER_USER } from '../../graphql/index';

const Register = (props) => {
  // gets the job done but too repetative
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isPassVisible, setIsPassVisible] = useState(false);

  const context = useContext(UserContext);

  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({});

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    // update will trigger if everything's went smoothly
    // returns proxy result
    update: (_, result) => {
      context.login(result.data.register);
      // take us to the home page if register succeeded
      props.history.push('/');
    },
    // it expects some variables to be sent for mutations
    variables: {
      username,
      email,
      password,
      confirmPassword,
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
          <Header as="h1" textAlign="center">
            Sign up
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
              fluid
              placeholder="username"
              type="text"
              error={errors.username || errors.usernameInUse}
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setErrors({});
              }}
            />
            <Form.Input
              fluid
              name="email"
              placeholder="some.mail@com"
              type="email"
              error={errors.email || errors.emailInUse}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrors({});
              }}
            />
            <Form.Input
              fluid
              placeholder="password"
              type={isPassVisible ? 'text' : 'password'}
              error={errors.password}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErrors({});
              }}
            >
              <input />
              <Button
                type="button"
                onClick={() => setIsPassVisible(!isPassVisible)}
              >
                {/* {isPassVisible ? 'visible' : 'hidden'} */}
                <Icon
                  name={isPassVisible ? 'eye' : 'eye slash'}
                  style={{ margin: 0 }}
                />
              </Button>
            </Form.Input>
            <Form.Input
              fluid
              placeholder="confirm password"
              type={isPassVisible ? 'text' : 'password'}
              error={errors.confirmPassword}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setErrors({});
              }}
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
