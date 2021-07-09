/* eslint-disable no-unused-vars */
import React, { useContext, useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import {
  Grid,
  Header,
  Loader,
  Form,
  Button,
  Message,
  Image,
} from 'semantic-ui-react';

import { NavigationContext } from '../../context/navigationContext/NavigationProvider';
import { UserContext } from '../../context/userContext/UserProvider';
import { defaultAvatar } from '../../appConfig';
import useLoadUser from '../../utils/hooks/loadUser';
import useUpdateUser from '../../utils/hooks/updateUser';

// TODO: cache update when the imageURL changes
const Settings = () => {
  const { userID } = useParams();
  const { user } = useContext(UserContext);
  const { setTemporaryTab } = useContext(NavigationContext);

  const [state, setState] = useState({
    errors: {},
    username: '',
    skills: '',
    status: '',
    successMessage: false,
    previewImage: null,
    imageFile: null,
    initialImage: null,
  });

  const [loadUser, { loading }] = useLoadUser(setState);
  const [updateUser] = useUpdateUser(setState);

  // croppper
  const [crop, setCrop] = useState({ aspect: 1 / 1 });
  const handleFileChange = (e) =>
    setState((prevState) => ({
      ...prevState,
      previewImage: URL.createObjectURL(e.target.files[0]),
    }));

  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
      successMessage: false,
      errors: {},
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const variables = {
      username: state.username,
      status: state.status,
      skills: state.skills,
      image: typeof image === 'string' ? null : state.imageFile,
    };
    updateUser({
      variables,
    });

    setState({
      ...state,
      imageFile: null,
    });
  };

  // TODO: cleanup
  useEffect(() => {
    loadUser({
      variables: {
        userID,
      },
    });
    setTemporaryTab({
      name: 'Settings',
      link: `/settings/${userID}`,
    });
  }, []);

  if (!user || userID !== user.id) {
    return <Redirect to="/404" />;
  }

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
              {state.successMessage && (
                <Message positive>
                  <Message.Header>User info updated</Message.Header>
                  <p>everything went smoothly!</p>
                </Message>
              )}
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Header as="h4" icon textAlign="center">
                    {/* <Image
                      className="settings__avatar"
                      style={{ width: 80 }}
                      src={preview}
                      rounded
                    /> */}

                    {/* TODO: URGENT FIX */}
                    {/* broken... */}
                    {/* <ImageController state={state} setState={setState} /> */}
                    <img
                      className="settings__preview"
                      src={
                        state.previewImage ? state.previewImage : defaultAvatar
                      }
                      alt="profile"
                    />
                    <Form.Input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                    />

                    {/* <Form.Input
                      type="file"
                      style={{ marginTop: 10 }}
                      onChange={inputOnChange}
                    /> */}

                    <Form.Input
                      label="username"
                      type="text"
                      className="settings__input themeForm"
                      value={state.username}
                      name="username"
                      onChange={handleChange}
                      error={
                        state.errors.usernameCheck ||
                        state.errors.usernameLength
                      }
                    />
                    <Form.Input
                      label="status"
                      type="text"
                      className="settings__input themeForm"
                      value={state.status}
                      name="status"
                      onChange={handleChange}
                      error={state.errors.statusLength}
                    />
                    <Form.TextArea
                      style={{ textAlign: 'center' }}
                      label="skills"
                      type="text"
                      className="settings__input themeForm"
                      value={state.skills}
                      name="skills"
                      onChange={handleChange}
                      error={state.errors.skillsLength}
                    />
                  </Header>
                </Form.Group>

                <Button type="submit" color="orange">
                  Submit
                </Button>
              </Form>
            </Grid.Column>
          </Grid>
        </>
      )}
    </div>
  );
};

export default Settings;
