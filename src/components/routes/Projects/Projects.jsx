import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import { UserContext } from '../../../context/UserProvider';
import ProjectSearch from './ProjectSearch';

const Projects = () => {
  const { user } = useContext(UserContext);

  return (
    <div style={{ textAlign: 'center', marginTop: 80 }} className="project">
      {user ? (
        <div>
          <Button
            as={Link}
            to="/projects/createProject"
            color="orange"
            animated="fade"
            tabIndex="0"
            style={{ marginTop: 10, display: 'inline-block' }}
          >
            <div className="visible content">Create a project?</div>
            <div className="hidden content">Create a project!</div>
          </Button>
          <ProjectSearch />
        </div>
      ) : (
        <ProjectSearch />
      )}
    </div>
  );
};

export default Projects;
