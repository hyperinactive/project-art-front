import { useQuery } from '@apollo/client';
import React from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import { GET_FRIENDS } from '../../graphql';
import Members from '../shared/Members';

const Chat = () => {
  const { data, loading, error } = useQuery(GET_FRIENDS, {
    onCompleted: () => {
      console.log(data);
    },
    onError: () => {
      console.log(error);
    },
  });
  const placeholder = 'I am the chat component!';

  if (error) return 'Error, my guy';
  return (
    <div className="chat">
      <h1>{placeholder}</h1>
      <Grid container columns={2} style={{ marginTop: 40 }} divided>
        <Grid.Column width={4}>
          {loading ? (
            <Loader size="huge" active>
              Computing, things, beep bop
            </Loader>
          ) : (
            <Grid.Row>
              <div
                style={{
                  textAlign: 'center',
                }}
              />
              <Members members={data.getFriends} type="user" />
            </Grid.Row>
          )}
        </Grid.Column>
        <Grid.Column width={12}>something</Grid.Column>
      </Grid>
    </div>
  );
};

export default Chat;
