import React from 'react';
import { Grid, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';

// TODO: GET_PROJECT_MEMBERS and GET_PROJECT_INFO
const Members = ({ members }) => (
  <div className="members">
    {members.map((member) => (
      <Grid.Row key={member.id} style={{ margin: 10 }}>
        <Image
          rounded
          size="tiny"
          src={
            member.imageURL
              ? `http://localhost:4000/files/${member.imageURL}`
              : `${process.env.PUBLIC_URL}/defaultAvatar.jpeg`
          }
        />
      </Grid.Row>
    ))}
  </div>
);

Members.defaultProps = {
  members: PropTypes.shape({
    imageURL: null,
    map: () => {},
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
};

export default Members;
