/* eslint-disable import/no-cycle */
/* eslint-disable react/prop-types */
import React, { useContext, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Button, Form, Message } from 'semantic-ui-react';

import { UserContext } from '../context/UserProvider';

import './Login.css';

const LOGIN_USER = gql`
  mutation login(
    # $ -> variables
    $username: String!
    $password: String!
  ) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

const Login = (props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // now we have access to our context data
  // we get the data from the result and pass it to our login function
  const context = useContext(UserContext);

  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({});

  const [addUser, { loading }] = useMutation(LOGIN_USER, {
    // update will trigger if everything's went smoothly
    // returns proxy result
    update: (_, result) => {
      context.login(result.data.login);

      // take us to the home page if register succeeded
      props.history.push('/');
    },
    // it expects some variables to be sent for mutations
    variables: {
      username,
      password,
    },
    // handle errors
    onError: (err) => {
      // normally, you'd have lots of errors here
      // but we've written our serverside to have a single object with errors
      // it is in the extension
      // console.log(err.graphQLErrors[0].extensions.exception);

      // console.log(err.graphQLErrors[0].extensions.exception.errors);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  // prevent the reload and invoke addUser()
  const handleSubmit = (e) => {
    e.preventDefault();
    addUser();
  };

  return (
    <div className="login">
      <Form
        onSubmit={handleSubmit}
        noValidate
        // the loading spinner class
        className={loading ? 'loading' : ''}
      >
        <h1>Login</h1>
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

export default Login;
