/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Grid, Header, Image, Loader } from 'semantic-ui-react';

import { GET_USER } from '../../graphql';

const Profile = (props) => {
  const { userID } = props.match.params;
  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      userID,
    },
    onCompleted: () => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  if (error) {
    return <Redirect to="/404" />;
  }

  return (
    <div className="profile">
      {loading ? (
        <Loader size="huge" active>
          Computing, things, beep bop
        </Loader>
      ) : (
        <>
          <Grid
            textAlign="center"
            style={{ height: '75vh' }}
            verticalAlign="middle"
          >
            <Grid.Column style={{ maxWidth: 450 }}>
              <Header as="h2" icon textAlign="center">
                <Image
                  style={{ width: 80 }}
                  src={
                    data.getUser.imageURL
                      ? `http://localhost:4000/files/${data.getUser.imageURL}`
                      : `${process.env.PUBLIC_URL}/defaultAvatar.jpeg`
                  }
                  rounded
                />
                <Header.Content style={{ margin: 10, marginTop: 20 }}>
                  {data.getUser.username}
                </Header.Content>
                <Header.Subheader>{data.getUser.status}</Header.Subheader>
              </Header>
              <Header as="h2" icon textAlign="center">
                <Header.Content style={{ margin: 10, marginTop: 20 }}>
                  skills
                </Header.Content>
                <Header.Subheader>status</Header.Subheader>
              </Header>
              <Header as="h2" icon textAlign="center">
                <Header.Content style={{ margin: 10, marginTop: 20 }}>
                  projects
                </Header.Content>
                <Header.Subheader>status</Header.Subheader>
              </Header>
            </Grid.Column>
          </Grid>
        </>
      )}
    </div>
  );
};

export default Profile;
