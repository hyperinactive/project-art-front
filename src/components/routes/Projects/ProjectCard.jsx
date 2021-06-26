import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProjectCard = ({
  project: { id, name, description, owner, memberCount },
}) => (
  <div style={{ paddingTop: 10, margin: 20 }} className="projectCard">
    <Card
      fluid
      className="project__projectCard__card"
      as={Link}
      to={`/projects/${id}`}
    >
      <Card.Content>
        <Card.Header className="project__projectCard__card__cardName">
          {name}
        </Card.Header>
        <Card.Meta>{description}</Card.Meta>
      </Card.Content>
      <Card.Content>
        <Card.Meta>{owner.username}</Card.Meta>
        <Card.Meta>{memberCount}</Card.Meta>
      </Card.Content>
    </Card>
  </div>
);

ProjectCard.propTypes = {
  project: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    owner: PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }),
    memberCount: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProjectCard;
