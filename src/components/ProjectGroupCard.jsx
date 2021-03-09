import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import './ProjectGroupCard.css';

const ProjectGroupCard = ({ project: { name, description } }) => (
  <div className="projectGroupCard">
    <Card className="projectGroupCard__card">
      <Card.Content>
        <Image
          avatar
          floated="left"
          src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
          className="projectGroupCard__avatar"
        />
        <Card.Header>{name}</Card.Header>
        <Card.Meta>{description}</Card.Meta>
      </Card.Content>
    </Card>
  </div>
);

ProjectGroupCard.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default ProjectGroupCard;
