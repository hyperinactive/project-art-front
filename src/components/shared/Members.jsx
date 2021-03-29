import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { defaultAvatar } from '../../appConfig';

const Members = ({ members, type }) => (
  <div className="members">
    {members.map((member) => (
      <Grid.Row key={member.id} style={{ margin: 10 }}>
        <Image
          rounded
          size="tiny"
          src={
            member.imageURL
              ? `http://localhost:4000/files/${member.imageURL}`
              : defaultAvatar
          }
          as={Link}
          to={`/${type}/${member.id}`}
        />
      </Grid.Row>
    ))}
  </div>
);

Members.defaultProps = {
  members: PropTypes.shape({
    imageURL: null,
    map: () => {},
    type: '',
  }),
};

Members.propTypes = {
  members: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
      imageURL: PropTypes.string,
      map: PropTypes.func,
    })
  ),
  type: PropTypes.string.isRequired,
};

export default Members;
