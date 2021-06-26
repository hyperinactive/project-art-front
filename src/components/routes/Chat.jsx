import { useQuery } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import { Card, Grid, Loader, Image, Header } from 'semantic-ui-react';
import { GET_FRIENDS } from '../../graphql';
import ElementList from '../shared/ElementList';
import { wip } from '../../appConfig';
import { NavigationContext } from '../../context/NavigationProvider';

const Chat = () => {
  const { data, loading, error } = useQuery(GET_FRIENDS, {
    onError: () => {
      console.log(error);
    },
  });
  const placeholder = 'I am the chat component!';
  const { setTemporaryTab } = useContext(NavigationContext);

  if (error) return 'Error, my guy';

  useEffect(() => {
    setTemporaryTab({
      name: 'inbox',
      link: `/chat`,
    });
  }, []);

  return (
    <div className="chat" style={{ textAlign: 'center' }}>
      <h2 style={{ marginTop: 45 }}>{placeholder}</h2>
      <Grid container columns={2} style={{ marginTop: 40 }} divided>
        <Grid.Column width={2}>
          {loading ? (
            <Loader size="huge" active>
              Computing, things, beep bop
            </Loader>
          ) : (
            <Grid.Row centered>
              <Header>My friends</Header>
              <ElementList elements={data.getFriends} type="user" />
            </Grid.Row>
          )}
        </Grid.Column>
        <Grid.Column width={14}>
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
