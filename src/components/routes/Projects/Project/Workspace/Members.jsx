/* eslint-disable react/prop-types */
import React from 'react';
import { Grid, Image } from 'semantic-ui-react';

// TODO: GET_PROJECT_MEMBERS and GET_PROJECT_INFO
const Members = ({ members }) => {
  console.log(members);
  return (
    <div className="members">
      {members.getProjectMembers.map((member) => (
        <Grid.Row key={member.id} style={{ margin: 10 }}>
          <Image
            rounded
            size="tiny"
            src={
              member.imageURL || `${process.env.PUBLIC_URL}/defaultAvatar.jpeg`
            }
          />
        </Grid.Row>
      ))}
    </div>
  );
};

export default Members;
