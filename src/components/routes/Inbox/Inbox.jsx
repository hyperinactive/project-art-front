/* eslint-disable no-unused-vars */
/* eslint-disable no-nested-ternary */
import {
  useQuery,
  useSubscription,
  useApolloClient,
  useLazyQuery,
} from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import { Grid, Loader } from 'semantic-ui-react';
import { cloneDeep } from '@apollo/client/utilities';

import {
  GET_FRIENDS,
  GET_MESSAGES,
  GET_USER_MESSAGES,
  NEW_MESSAGE,
} from '../../../graphql';
import { NavigationContext } from '../../../context/NavigationProvider';
import InboxUserCard from './InboxUserCard';
import InboxFeed from './InboxFeed';
import InboxForm from './InboxForm';
import { InboxContext } from '../../../context/InboxProvider';

const Inbox = () => {
  const { cache } = useApolloClient();
  const { selectedUser, setSelectedUser, friends, setUsers } =
    useContext(InboxContext);

  const [loadUserMessages, { data: userMessageData, loading: friendsLoading }] =
    useLazyQuery(GET_USER_MESSAGES, {
      onCompleted: () => {
        console.log(userMessageData);
      },
      onError: (error) => {
        console.log(error);
      },
    });

  // const {
  //   data: friendsData,
  //   loading: friendsLoading,
  //   error: friendsError,
  // } = useQuery(GET_FRIENDS, {
  //   onCompleted: () => {
  //     // TODO: maybe compare the latest messages and sort by the latest message sent
  //     // if there are friends set the selected one to the first one
  //     if (friendsData.getFriends.length > 0) {
  //       setSelectedUser(friendsData.getFriends[0].id);
  //       setUsers(friendsData.getFriends);
  //     }
  //   },
  //   onError: () => {
  //     console.log(friendsError);
  //   },
  // });

  const { data: subData } = useSubscription(NEW_MESSAGE, {
    onSubscriptionData: (data) => {
      const friendID = data.subscriptionData.data.newMessage.fromUser.id;

      const cacheData = cache.readQuery({
        query: GET_USER_MESSAGES,
      });
      const cacheClone = cloneDeep(cacheData);

      Object.entries(cacheClone.getUserMessages).forEach((entry) => {
        if (entry[1].user.id === friendID) {
          entry[1].messages.push(data.subscriptionData.data.newMessage);
        }
      });

      cache.writeQuery({
        query: GET_USER_MESSAGES,
        variables: { toUserID: friendID },
        data: cacheClone.getUserMessages,
      });
    },
  });

  const { setTemporaryTab } = useContext(NavigationContext);

  useEffect(() => {
    loadUserMessages();
    setTemporaryTab({
      name: 'Inbox',
      link: `/inbox`,
    });
  }, []);

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
                {selectedUser ? (
                  userMessageData &&
                  userMessageData.getUserMessages.map((userMObj) => {
                    if (userMObj.user.id === selectedUser) {
                      return <InboxFeed feed={userMObj.messages} />;
                    }
                    return null;
                  })
                ) : (
                  <InboxFeed feed={[]} />
                )}
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
                {userMessageData &&
                  userMessageData.getUserMessages &&
                  userMessageData.getUserMessages.map((userMObj) => (
                    <InboxUserCard
                      key={userMObj.user.id}
                      active={selectedUser === userMObj.user.id}
                      username={userMObj.user.username}
                      imageURL={userMObj.user.imageURL}
                      latestMessageContent={
                        userMObj.latestMessage
                          ? userMObj.latestMessage.content
                          : null
                      }
                      latestMessageFromID={
                        userMObj.latestMessage
                          ? userMObj.latestMessage.fromUser.id
                          : null
                      }
                      onClick={() => setSelectedUser(userMObj.user.id)}
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
