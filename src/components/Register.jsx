import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button, Form } from 'semantic-ui-react';

import './Register.css';

const REGISTER_USER = gql`
  mutation register(
    # $ -> variables
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({});

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    // update will trigger if everything's went smoothly
    // returns proxy result
    update: (proxy, result) => {
      console.log(result);
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
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <Form.Input
          name="email"
          label="email"
          placeholder="some.mail@com"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Form.Input
          name="password"
          label="password"
          placeholder="password"
          value={password}
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Form.Input
          name="confirmPassword"
          label="confirm password"
          placeholder="password"
          type="password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
        <Button type="submit" color="orange" animated="fade" tabIndex="0">
          <div className="visible content">Looks good?</div>
          <div className="hidden content">Submit now!</div>
        </Button>
      </Form>
    </div>
  );
};

export default Register;
