import { useQuery } from '@apollo/client';
import React from 'react';
import { Card, Grid, Loader, Image } from 'semantic-ui-react';
import { GET_FRIENDS } from '../../graphql';
import Members from '../shared/Members';
import { wip } from '../../appConfig';

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
    <div className="chat" style={{ textAlign: 'center' }}>
      <h2 style={{ marginTop: 45 }}>{placeholder}</h2>
      <Grid container columns={2} style={{ marginTop: 40 }} divided>
        <Grid.Column width={4}>
          {loading ? (
            <Loader size="huge" active>
              Computing, things, beep bop
            </Loader>
          ) : (
            <Grid.Row centered>
              <div
                style={{
                  textAlign: 'center',
                }}
              />
              <Members members={data.getFriends} type="user" />
            </Grid.Row>
          )}
        </Grid.Column>
        <Grid.Column width={12}>
          <Grid.Row centered>
            <Card>
              <Card.Content>
                <Card.Header>This is where we chat!</Card.Header>
                <Card.Description>(in the future)</Card.Description>
                <Card.Meta>(hopefully...)</Card.Meta>
              </Card.Content>
            </Card>
            <Image src={wip} size="medium" />
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Chat;
