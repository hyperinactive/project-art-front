import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form, Grid, Header, Icon } from 'semantic-ui-react';
import { NavigationContext } from '../../context/navigationContext/NavigationProvider';

import useLogin from '../../utils/hooks/login';
import LoaderComponent from '../shared/LoaderComponent';

const LoginForm = () => {
  const { setActiveItem } = useContext(NavigationContext);
  const history = useHistory();

  const [isPassVisible, setIsPassVisible] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const [loginUser, { loading }] = useLogin(username, password, setErrors);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser();
  };

  return (
    <div className="login">
      {loading && <LoaderComponent />}
      <Grid
        textAlign="center"
        style={{ height: '70vh' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h1" textAlign="center" className="headline">
            Log me in!
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
              className="themeForm"
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
            <Button
              as="div"
              fluid
              size="large"
              type="submit"
              color="orange"
              animated="fade"
              tabIndex="0"
              style={{ marginTop: 10 }}
              onClick={() => {
                history.push('/register');
                setActiveItem('register');
              }}
            >
              <div className="visible content">New here?</div>
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

export default LoginForm;
