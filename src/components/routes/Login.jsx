/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/destructuring-assignment */
import React, { useState, useContext } from 'react';
import { useMutation } from '@apollo/client';
import { Button, Form, Grid, Header, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { UserContext } from '../../context/UserProvider';
import { LOGIN_USER } from '../../graphql';

const LoginForm = (props) => {
  const [isPassVisible, setIsPassVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // now we have access to our context data
  // we get the data from the result and pass it to our login function
  const context = useContext(UserContext);

  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({});

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
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
    loginUser();
  };

  return (
    <div className="login">
      <Grid
        textAlign="center"
        style={{ height: '70vh' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" textAlign="center">
            Log-in to your account
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

            <Button
              fluid
              size="large"
              type="submit"
              color="orange"
              animated="fade"
              tabIndex="0"
            >
              <div className="visible content">Looks good?</div>
              <div className="hidden content">Sign me in!</div>
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
          <Button
            as="div"
            fluid
            size="large"
            type="submit"
            color="orange"
            animated="fade"
            tabIndex="0"
            style={{ marginTop: 10 }}
            onClick={() => props.history.push('/register')}
          >
            <div className="visible content">New here?</div>
            <div className="hidden content">Sign me up!</div>
          </Button>
        </Grid.Column>
      </Grid>
    </div>
  );
};

// TODO: fix this please for the love of God
// history prop?
LoginForm.propTypes = {
  history: PropTypes.any.isRequired,
};

export default LoginForm;
