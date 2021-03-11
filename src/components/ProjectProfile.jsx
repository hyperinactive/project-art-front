/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Image } from 'semantic-ui-react';
import { UserContext } from '../context/UserProvider';

// project.project.<attributes>...
const ProjectProfile = ({ project }) => {
  const { user } = useContext(UserContext);

  const handleClick = () => {
    console.log('handling the click');
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
