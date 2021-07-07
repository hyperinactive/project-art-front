import { useMutation, useLazyQuery } from '@apollo/client';
import React, { useContext, useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { Grid, Header, Loader, Form, Button, Message } from 'semantic-ui-react';
import { cloneDeep } from 'lodash';

import { NavigationContext } from '../../context/navigationContext/NavigationProvider';
import { baseURL, defaultAvatar } from '../../appConfig';
import { UserContext } from '../../context/userContext/UserProvider';
import { GET_USER, UPDATE_USER } from '../../graphql';
import { GET_USERS } from '../../graphql/userGQL';
import ImageController from '../shared/ImageController';

// TODO: cache update when the imageURL changes
const Settings = () => {
  const { user, login } = useContext(UserContext);
  const { userID } = useParams();
  const { setTemporaryTab } = useContext(NavigationContext);

  const [state, setState] = useState({
    errors: {},
    username: '',
    skills: '',
    status: '',
    successMessage: false,
    previewImage: defaultAvatar,
    imageFile: null,
  });

  const [loadUser, { data, loading }] = useLazyQuery(GET_USER, {
    variables: {
      userID,
    },
    onCompleted: () => {
      setState({
        ...state,
        username: data.getUser.username,
        skills: data.getUser.skills,
        status: data.getUser.status,
      });
      if (data.getUser.imageURL) {
        setState({
          ...state,
          previewImage: `${baseURL}/files/${data.getUser.imageURL}`,
        });
      }
      setState({
        ...state,
        imageFile: `${baseURL}/files/${data.getUser.imageURL}`,
      });
    },
    onError: (err) => {
      console.log(err);
      setState({
        ...state,
        errors: err.graphQLErrors[0].extensions.exception.errors,
      });
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

      const users = cache.readQuery({
        query: GET_USERS,
      });

      const usersClone = cloneDeep(users);

      if (usersClone !== null) {
        const filtered = usersClone.getUsers.map((e) => {
          if (e.id.toString() === user.id) {
            return result.data.updateUser;
          }
          return e;
        });

        cache.writeQuery({
          query: GET_USERS,
          data: {
            getUsers: filtered,
          },
        });
      }
    },
    onCompleted: (res) => {
      login(res.updateUser);
      setState({
        ...state,
        successMessage: true,
      });
    },
    onError: (err) => {
      console.log(err);
      setState({
        ...state,
        errors: err.graphQLErrors[0].extensions.exception.errors,
      });
    },
  });

  // const inputOnChange = (e) => {
  //   if (e.target.files[0]) {
  //     setPreviewI(URL.createObjectURL(e.target.files[0]));
  //     setImage(e.target.files[0]);
  //     setSuccessMessage(false);
  //   }
  // };

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

  useEffect(() => {
    loadUser();
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
                    <ImageController state={state} setState={setState} />

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
