import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { UserContext } from '../../../../context/userContext/UserProvider';
import useAddMember from '../../../../utils/hooks/addMember';
import { logo } from '../../../../appConfig';

// project.project.<attributes>...
const ProjectProfile = ({ project }) => {
  const { user } = useContext(UserContext);

  const [addMember] = useAddMember(project.id);

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
        marginTop: 100,
      }}
    >
      <Header as="h2" icon textAlign="center">
        <Header.Content className="headline">{project.name}</Header.Content>
        <Header.Subheader className="headline">
          {project.description}
        </Header.Subheader>
      </Header>
      <Image rounded src={logo} size="tiny" />
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

ProjectProfile.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProjectProfile;
