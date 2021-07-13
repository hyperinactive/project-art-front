import React, { useContext, useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { Loader, Form, Button, Message } from 'semantic-ui-react';

import { NavigationContext } from '../../context/navigationContext/NavigationProvider';
import { UserContext } from '../../context/userContext/UserProvider';
import { defaultAvatar } from '../../appConfig';
import useLoadUser from '../../utils/hooks/loadUser';
import useUpdateUser from '../../utils/hooks/updateUser';
import CropComponent from '../shared/CropComponent';

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
    newImage: false,
  });

  const [loadUser, { loading }] = useLoadUser(setState);
  const [updateUser] = useUpdateUser(setState);

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
      image: state.newImage ? state.previewImage : null,
    };
    updateUser({
      variables,
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
          {state.successMessage && (
            <Message positive>
              <p>everything went smoothly!</p>
            </Message>
          )}

          <div className="settings__top">
            <img
              className="settings__preview"
              src={state.previewImage ? state.previewImage : defaultAvatar}
              alt="profile"
            />

            <CropComponent setState={setState} />
          </div>
          <Form className="settings__bottom" onSubmit={handleSubmit}>
            <Form.Group className="settings__bottom__form">
              <Form.Input
                label="username"
                type="text"
                className="settings__input themeForm"
                value={state.username}
                name="username"
                onChange={handleChange}
                error={
                  state.errors.usernameCheck || state.errors.usernameLength
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
                label="skills"
                type="text"
                className="settings__input themeForm"
                value={state.skills}
                name="skills"
                onChange={handleChange}
                error={state.errors.skillsLength}
              />
            </Form.Group>

            <Button type="submit" color="orange">
              Submit
            </Button>
          </Form>
        </>
      )}
    </div>
  );
};

export default Settings;
