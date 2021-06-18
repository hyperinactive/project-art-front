import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Grid, Loader, Input } from 'semantic-ui-react';
import Members from '../shared/Members';
import { UserContext } from '../../context/UserProvider';
import { GET_FRIENDS } from '../../graphql';
import { GET_USERS } from '../../graphql/userGQL';

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
          <Grid.Row>
            <Input
              placeholder="search and destory"
              icon="search"
              style={{ margin: 20, display: 'inline-block' }}
            />
            {userLoading ? (
              <Loader size="huge" active>
                Computing, things, beep bop
              </Loader>
            ) : (
              userData.getUsers.map((e) => <h2>{e.username}</h2>)
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
            <Members members={data.getFriends} type="user" />
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Friends;
