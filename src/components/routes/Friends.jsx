import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Grid, Loader, Input, Image } from 'semantic-ui-react';
import ElementList from '../shared/ElementList';
import { UserContext } from '../../context/UserProvider';
import { GET_FRIENDS } from '../../graphql';
import { GET_USERS } from '../../graphql/userGQL';
import { baseURL, defaultAvatar } from '../../appConfig';

const Friends = () => {
  const { user } = useState(UserContext);
  const history = useHistory();

  if (user === null) history.push('/register');

  const { data, loading, error } = useQuery(GET_FRIENDS, {
    onCompleted: () => {
      console.log(data.getFriends);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const { data: userData, loading: userLoading } = useQuery(GET_USERS, {
    onCompleted: () => {
      console.log(userData.getUsers);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  if (loading)
    return (
      <Loader size="huge" active>
        Computing, things, beep bop
      </Loader>
    );
  if (error) return <h1>Error</h1>;

  return (
    <div>
      <div className="spacerDiv" style={{ padding: 20 }} />
      <Grid centered columns={2} divided>
        <Grid.Column width={13}>
          <Input
            placeholder="search and destory"
            icon="search"
            style={{ margin: 20, display: 'inline-block' }}
          />
          <Grid.Row>
            {userLoading ? (
              <Loader size="huge" active>
                Computing, things, beep bop
              </Loader>
            ) : (
              <Grid doubling columns={5}>
                {userData.getUsers.map((member) => (
                  <Grid.Column key={member.id}>
                    <div style={{ textAlign: 'center' }}>
                      <Image
                        rounded
                        size="tiny"
                        src={
                          member.imageURL
                            ? `${baseURL}/files/${member.imageURL}`
                            : defaultAvatar
                        }
                        as={Link}
                        to={`/user/${member.id}`}
                      />
                      <p>{member.username}</p>
                    </div>
                  </Grid.Column>
                ))}
              </Grid>
            )}
          </Grid.Row>
        </Grid.Column>
        <Grid.Column width={2}>
          <div className="h2">My friends</div>
          <Grid.Row>
            <div
              style={{
                textAlign: 'center',
              }}
            />
            <ElementList elements={data.getFriends} type="user" />
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Friends;
