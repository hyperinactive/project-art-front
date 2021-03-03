/* eslint-disable react/prop-types */
import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Form, Message } from 'semantic-ui-react';

import { UserContext } from '../context/UserProvider';

import './Register.css';

import { REGISTER_USER } from '../graphql/index';

const Register = (props) => {
  // gets the job done but too repetative
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const context = useContext(UserContext);

  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({});

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
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
      // normally, you'd have lots of errors here
      // but we've written our serverside to have a single object with errors
      // it is in the extension
      // console.log(err.graphQLErrors[0].extensions.exception);

      // BIG PROBLEM: if the 1st registration is unsuccessful the errors will persist onto the next attempt
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  // prevent the reload and invoke addUser()
  const handleSubmit = (e) => {
    e.preventDefault();
    addUser();
  };

  return (
    <div className="register">
      <Form
        onSubmit={handleSubmit}
        noValidate
        // the loading spinner class
        className={loading ? 'loading' : ''}
      >
        <h1>Register</h1>
        <Form.Input
          name="username"
          label="username"
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
          name="email"
          label="email"
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
          name="password"
          label="password"
          placeholder="password"
          value={password}
          type="password"
          error={!!errors.password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors({});
          }}
        />
        <Form.Input
          name="confirmPassword"
          label="confirm password"
          placeholder="password"
          type="password"
          error={!!errors.confirmPassword}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            setErrors({});
          }}
        />
        <Button type="submit" color="orange" animated="fade" tabIndex="0">
          <div className="visible content">Looks good?</div>
          <div className="hidden content">Submit now!</div>
        </Button>
      </Form>

      {/* if there were errors loop over them and make list items with their message */}
      {Object.keys(errors).length > 0 && (
        <Message
          error
          header="Errors with the submission"
          list={Object.values(errors).map((value) => (
            <li key={value}>{value}</li>
          ))}
        />
      )}
    </div>
  );
};

export default Register;
