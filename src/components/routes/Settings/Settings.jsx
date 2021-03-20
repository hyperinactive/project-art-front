import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Grid, Header, Loader, Image, Form, Button } from 'semantic-ui-react';
import { GET_USER } from '../../../graphql';
import './Settings.css';

const Settings = () => {
  const { userID } = useParams();
  const [state, setState] = useState({
    username: '',
    email: '',
    skills: '',
    status: '',
  });
  const { data, loading } = useQuery(GET_USER, {
    variables: {
      userID,
    },
    onCompleted: () => {
      setState({
        username: data.getUser.username,
        email: data.getUser.email,
        skills: data.getUser.skills,
        status: data.getUser.status,
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="settings">
      {loading ? (
        <Loader size="huge" active>
          Computing, things, beep bop
        </Loader>
      ) : (
        <>
          <Grid
            textAlign="center"
            style={{ height: '75vh' }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Form>
                <Form.Group>
                  <Header as="h4" icon textAlign="center">
                    <Image
                      style={{ width: 80 }}
                      src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
                      rounded
                    />
                    <Form.Input
                      label="username"
                      type="text"
                      className="settings__input"
                      value={state.username}
                      name="username"
                      onChange={handleChange}
                    />
                    <Form.Input
                      label="status"
                      type="text"
                      className="settings__input"
                      value={state.status}
                      onChange={handleChange}
                    />
                    <Form.Input
                      label="skills"
                      type="text"
                      className="settings__input"
                      value={state.skills}
                      onChange={handleChange}
                    />
                  </Header>
                </Form.Group>

                <Button type="submit">Submit</Button>
              </Form>
            </Grid.Column>
          </Grid>
        </>
      )}
    </div>
  );
};

export default Settings;
