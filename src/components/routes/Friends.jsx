import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { Grid, Loader } from 'semantic-ui-react';
import Members from '../shared/Members';
import { UserContext } from '../../context/UserProvider';
import { GET_FRIENDS } from '../../graphql';

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
          <h2>Users placehold</h2>
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
