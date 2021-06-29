/* eslint-disable no-unused-vars */
import { useLazyQuery } from '@apollo/client';
import React, { useContext, useEffect, useState } from 'react';
import { Grid, Loader, Image } from 'semantic-ui-react';

import { GET_FRIENDS, GET_MESSAGES } from '../../graphql';
import { baseURL, defaultAvatar, wip } from '../../appConfig';
import { NavigationContext } from '../../context/NavigationProvider';

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
      link: `/chat`,
    });
  }, [selectedUser]);

  return (
    <div className="inboxComponent" style={{ textAlign: 'center' }}>
      <Grid container columns={2} style={{ marginTop: 40 }} divided>
        <Grid.Column width={10}>
          <Grid.Row className="inboxComponent__chat" centered>
            messages component
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
                    <div
                      key={friend.id}
                      className="inboxComponent__friendList__friendCard"
                    >
                      <Image
                        className="inboxComponent__friendList__friendCard__avatar"
                        rounded
                        size="tiny"
                        src={
                          friend.imageURL
                            ? `${baseURL}/files/${friend.imageURL}`
                            : defaultAvatar
                        }
                      />
                      <div className="inboxComponent__friendList__friendCard__info">
                        <h2 className="inboxComponent__friendList__friendCard__info__name headline">
                          {friend.username}
                        </h2>
                        <h4 className="inboxComponent__friendList__friendCard__info__message">
                          --placeholder message--
                        </h4>
                      </div>
                    </div>
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
