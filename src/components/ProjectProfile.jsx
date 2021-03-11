import React from 'react';
import { Button } from 'semantic-ui-react';

const ProjectProfile = () => {
  const placeholder = 'Project Profile page -- join us!';
  return (
    <div className="projectProfile">
      <h1>{placeholder}</h1>
      <Button color="orange">Join the project!</Button>
    </div>
  );
};

export default ProjectProfile;
