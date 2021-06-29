/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable no-unused-vars */
import { useLazyQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { Grid, Loader, Image } from 'semantic-ui-react';

import { GET_FRIENDS, GET_MESSAGES } from '../../../graphql';
import { baseURL, defaultAvatar, wip } from '../../../appConfig';
import { NavigationContext } from '../../../context/NavigationProvider';
import InboxUserCard from './InboxUserCard';

const Inbox = () => {
  const [
    loadFriends,
    { data: friendsData, loading: friendsLoading, error: friendsError },
  ] = useLazyQuery(GET_FRIENDS, {
    onError: () => {
      console.log(friendsError);
    },
  });

  const [loadMessages, { data, loading, error }] = useLazyQuery(GET_MESSAGES);

  const { setTemporaryTab } = useContext(NavigationContext);
  const [selectedUser, setSelectedUser] = useState(null);

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
            {selectedUser ? <p>{selectedUser}</p> : <p>messages component</p>}
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
                      onClick={() => {
                        setSelectedUser(friend.id);
                        console.log(selectedUser);
                      }}
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
