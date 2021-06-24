import { useMutation, useQuery } from '@apollo/client';
import React, { useContext, useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import {
  Grid,
  Header,
  Loader,
  Image,
  Form,
  Button,
  Message,
} from 'semantic-ui-react';
import { cloneDeep } from 'lodash';

import { NavigationContext } from '../../../context/NavigationProvider';
import { baseURL, defaultAvatar } from '../../../appConfig';
import { UserContext } from '../../../context/UserProvider';
import { GET_USER, UPDATE_USER } from '../../../graphql';
import './Settings.scss';
import { GET_USERS } from '../../../graphql/userGQL';

// TODO: cache update when the imageURL changes
const Settings = () => {
  const { user, login } = useContext(UserContext);
  const { userID } = useParams();
  const { setTemporaryTab } = useContext(NavigationContext);

  const [errors, setErrors] = useState({});
  const [state, setState] = useState({
    username: '',
    skills: '',
    status: '',
  });
  const [preview, setPreview] = useState(defaultAvatar);
  const [image, setImage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(false);

  useEffect(() => {
    setTemporaryTab({
      name: 'settings',
      link: `/settings/${userID}`,
    });
  }, []);

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
        setPreview(`${baseURL}/files/${data.getUser.imageURL}`);
      }
      setImage(`${baseURL}/files/${data.getUser.imageURL}`);
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
      // cache.modify({
      //   fields: {
      //     getUsers: (previous) => {
      //       const prevClone = cloneDeep(previous);
      //       console.log(prevClone);
      //       const filteredUsers = prevClone.map((e) => {
      //         console.log(e);
      //         if (e.id.toString() === user.id) {
      //           console.log('found it');
      //           console.log(e);
      //           return result.data.updateUser;
      //         }
      //         return e;
      //       });
      //       return filteredUsers;
      //     },
      //   },
      // });
    },
    onCompleted: (res) => {
      login(res.updateUser);
      setSuccessMessage(true);
    },
    onError: (err) => {
      console.log(err);
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  const inputOnChange = (e) => {
    if (e.target.files[0]) {
      setPreview(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
      setSuccessMessage(false);
    }
  };

  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setSuccessMessage(false);
    setErrors({});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const variables = {
      username: state.username,
      status: state.status,
      skills: state.skills,
      image: typeof image === 'string' ? null : image,
    };
    updateUser({
      variables,
    });
    setImage(null);
  };

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
              {successMessage && (
                <Message positive>
                  <Message.Header>User info updated</Message.Header>
                  <p>everything went smoothly!</p>
                </Message>
              )}
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
                      error={errors.usernameCheck || errors.usernameLength}
                    />
                    <Form.Input
                      label="status"
                      type="text"
                      className="settings__input"
                      value={state.status}
                      name="status"
                      onChange={handleChange}
                      error={errors.statusLength}
                    />
                    <Form.TextArea
                      style={{ textAlign: 'center' }}
                      label="skills"
                      type="text"
                      className="settings__input"
                      value={state.skills}
                      name="skills"
                      onChange={handleChange}
                      error={errors.skillsLength}
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
