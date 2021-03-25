/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-undef */
/* eslint-disable react/jsx-props-no-spreading */
import { useMutation, useQuery } from '@apollo/client';
import React, { useContext, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { Grid, Header, Loader, Image, Form, Button } from 'semantic-ui-react';
import { UserContext } from '../../../context/UserProvider';
import { GET_USER, UPDATE_USER } from '../../../graphql';
import './Settings.css';

// TODO: cache update when the imageURL changes
const Settings = () => {
  const { user, login } = useContext(UserContext);
  const { userID } = useParams();

  if (!user || userID !== user.id) {
    return <Redirect to="/" />;
  }

  const [errors, setErrors] = useState({});
  const [state, setState] = useState({
    username: '',
    skills: '',
    status: '',
  });
  const [preview, setPreview] = useState(
    `${process.env.PUBLIC_URL}/defaultAvatar.jpeg`
  );
  const [image, setImage] = useState(null);

  const { data, loading } = useQuery(GET_USER, {
    variables: {
      userID,
    },
    onCompleted: () => {
      setState({
        username: data.getUser.username,
        skills: data.getUser.skills,
        status: data.getUser.status,
      });
      if (data.getUser.imageURL) {
        setPreview(`http://localhost:4000/files/${data.getUser.imageURL}`);
      }
      setImage(`http://localhost:4000/files/${data.getUser.imageURL}`);
    },
    onError: (err) => {
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  const [updateUser] = useMutation(UPDATE_USER, {
    update: (cache, result) => {
      cache.writeQuery({
        query: GET_USER,
        variables: {
          userID: user.id,
        },
        data: result.data.updateUser,
      });
    },
    onCompleted: (res) => {
      console.log(res);
      login(res.updateUser);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const inputOnChange = (e) => {
    console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
    console.log(image);
  };

  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({
      variables: {
        username: state.username,
        status: state.status,
        skills: state.skills,
        image,
      },
    });
    console.log(state);
    console.log(image);
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
            style={{ height: '90vh' }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Header as="h4" icon textAlign="center">
                    <Image
                      className="settings__avatar"
                      style={{ width: 80 }}
                      src={preview}
                      rounded
                    />

                    <Form.Input
                      type="file"
                      style={{ marginTop: 10 }}
                      onChange={inputOnChange}
                    />

                    <Form.Input
                      label="username"
                      type="text"
                      className="settings__input"
                      value={state.username}
                      name="username"
                      onChange={handleChange}
                      error={errors.usernameCheck}
                    />
                    <Form.Input
                      label="status"
                      type="text"
                      className="settings__input"
                      value={state.status}
                      name="status"
                      onChange={handleChange}
                    />
                    <Form.TextArea
                      style={{ textAlign: 'center' }}
                      label="skills"
                      type="text"
                      className="settings__input"
                      value={state.skills}
                      name="skills"
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
