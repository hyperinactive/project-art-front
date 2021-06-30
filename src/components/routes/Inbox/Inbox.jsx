/* eslint-disable no-nested-ternary */
import { useLazyQuery } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import { Grid, Loader } from 'semantic-ui-react';

import { GET_FRIENDS, GET_MESSAGES } from '../../../graphql';
import { NavigationContext } from '../../../context/NavigationProvider';
import InboxUserCard from './InboxUserCard';
import InboxFeed from './InboxFeed';
import InboxForm from './InboxForm';
import { InboxContext } from '../../../context/InboxProvider';

const Inbox = () => {
  const { selectedUser, setSelectedUser } = useContext(InboxContext);
  const [
    loadFriends,
    { data: friendsData, loading: friendsLoading, error: friendsError },
  ] = useLazyQuery(GET_FRIENDS, {
    onError: () => {
      console.log(friendsError);
    },
  });

  const [loadMessages, { data: messagesData, loading: messagesLoading }] =
    useLazyQuery(GET_MESSAGES, {
      onError: (err) => {
        console.log(err);
      },
    });

  const { setTemporaryTab } = useContext(NavigationContext);

  useEffect(() => {
    loadFriends();
    if (selectedUser) loadMessages({ variables: { toUserID: selectedUser } });
    setTemporaryTab({
      name: 'Inbox',
      link: `/inbox`,
    });
  }, [selectedUser]);

  return (
    <div className="inboxComponent" style={{ textAlign: 'center' }}>
      <Grid container columns={2} style={{ marginTop: 40 }} divided>
        <Grid.Column width={10}>
          <Grid.Row className="inboxComponent__chat" centered>
            {/* TODO: handle inside InboxFeed? lift selected user state? */}
            {/* if a user has been selected, load messages */}
            {/* if messages are being loader display the loader */}
            {selectedUser ? (
              messagesLoading ? (
                <Loader size="huge" active>
                  Computing, things, beep bop
                </Loader>
              ) : messagesData &&
                messagesData.getMessages &&
                messagesData.getMessages.length > 0 ? (
                <>
                  <InboxFeed messages={messagesData.getMessages} />
                  <InboxForm />
                </>
              ) : (
                <>
                  <InboxFeed messages={[]} />
                  <InboxForm />
                </>
              )
            ) : (
              <p>select a friend to see messages</p>
            )}
          </Grid.Row>
        </Grid.Column>

        <Grid.Column width={6}>
          {friendsLoading ? (
            <Loader size="huge" active>
              Computing, things, beep bop
            </Loader>
          ) : (
            <Grid.Row centered>
              <div className="inboxComponent__friendList">
                {friendsData &&
                  friendsData.getFriends &&
                  friendsData.getFriends.map((friend) => (
                    <InboxUserCard
                      key={friend.id}
                      active={selectedUser === friend.id}
                      username={friend.username}
                      imageURL={friend.imageURL}
                      onClick={() => setSelectedUser(friend.id)}
                    />
                  ))}
              </div>
            </Grid.Row>
          )}
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Inbox;
