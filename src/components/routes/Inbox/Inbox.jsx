/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import { useQuery, useSubscription, useApolloClient } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import { cloneDeep } from '@apollo/client/utilities';

import { GET_FRIENDS, GET_MESSAGES, NEW_MESSAGE } from '../../../graphql';
import { NavigationContext } from '../../../context/NavigationProvider';
import InboxUserCard from './InboxUserCard';
import InboxFeed from './InboxFeed';
import InboxForm from './InboxForm';
import { InboxContext } from '../../../context/InboxProvider';

const Inbox = () => {
  const { cache } = useApolloClient();
  const { selectedUser, setSelectedUser, friends, setUsers } =
    useContext(InboxContext);

  const {
    data: friendsData,
    loading: friendsLoading,
    error: friendsError,
  } = useQuery(GET_FRIENDS, {
    onCompleted: () => {
      // TODO: maybe compare the latest messages and sort by the latest message sent
      // if there are friends set the selected one to the first one
      if (friendsData.getFriends.length > 0) {
        setSelectedUser(friendsData.getFriends[0].id);
        setUsers(friendsData.getFriends);
        // Object.entries(friends).forEach((friend) => {
        //   console.log(friend);
        // });
      }
    },
    onError: () => {
      console.log(friendsError);
    },
  });

  const { data: subData } = useSubscription(NEW_MESSAGE, {
    onSubscriptionData: (data) => {
      console.log(data);
      const friendID = data.subscriptionData.data.newMessage.fromUser.id;
      console.log(friendID);

      const cacheData = cache.readQuery({
        query: GET_MESSAGES,
        variables: {
          toUserID: friendID,
        },
      });
      const cacheClone = cloneDeep(cacheData);

      // if there were no messages just return the new message
      if (cacheClone.getMessages === null) {
        cache.writeQuery({
          query: GET_MESSAGES,
          variables: { toUserID: friendID },
          data: {
            getMessages: [...data.subscriptionData.data.newMessage],
          },
        });
      } else {
        cacheClone.getMessages = [
          ...cacheClone.getMessages,
          data.subscriptionData.data.newMessage,
        ];

        cache.writeQuery({
          query: GET_MESSAGES,
          variables: { toUserID: friendID },
          data: {
            getMessages: cacheClone.getMessages,
          },
        });
      }
    },
  });

  const { setTemporaryTab } = useContext(NavigationContext);

  useEffect(() => {
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
              <div className="inboxComponent__chat">
                <InboxFeed />
                <InboxForm />
              </div>
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
