/* eslint-disable react/prop-types */
import { useMutation } from '@apollo/client';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Image } from 'semantic-ui-react';
import { UserContext } from '../context/UserProvider';
import { ADD_MEMBER, GET_PROJECT } from '../graphql';

// project.project.<attributes>...
const ProjectProfile = ({ project }) => {
  const { user } = useContext(UserContext);

  const [addMember] = useMutation(ADD_MEMBER, {
    variables: {
      projectID: project.id,
    },
    update: (cache, result) => {
      cache.writeQuery({
        query: GET_PROJECT,
        data: {
          getProject: result.data.addMember,
        },
      });
    },
  });
  const handleClick = (e) => {
    e.preventDefault();
    addMember();
  };
  return (
    <div
      className="projectProfile"
      style={{
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Header as="h2" icon textAlign="center">
        <Header.Content>{project.name}</Header.Content>
        <Header.Subheader>{project.description}</Header.Subheader>
      </Header>
      <Image
        circular
        src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        size="tiny"
      />
      {user ? (
        <Button color="orange" onClick={handleClick} style={{ margin: 20 }}>
          Join the project!
        </Button>
      ) : (
        <Button as={Link} to="/login" color="orange" style={{ margin: 20 }}>
          Join the project!
        </Button>
      )}
    </div>
  );
};

export default ProjectProfile;
