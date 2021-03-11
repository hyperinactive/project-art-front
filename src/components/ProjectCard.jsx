import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const ProjectGroupCard = ({
  project: { name, description, owner, memberCount },
}) => (
  <div style={{ paddingTop: 10, margin: 20 }} className="projectGroupCard">
    <Card fluid className="projectGroupCard__card">
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
      <Card.Content>
        <Card.Meta>{owner.username}</Card.Meta>
        <Card.Meta>{memberCount}</Card.Meta>
      </Card.Content>
    </Card>
  </div>
);

ProjectGroupCard.propTypes = {
  project: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
    memberCount: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProjectGroupCard;
