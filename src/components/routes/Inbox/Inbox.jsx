import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';

import LoaderComponent from '../../shared/LoaderComponent';
import InboxUserCard from './InboxUserCard';
import InboxFeed from './InboxFeed';
import InboxForm from './InboxForm';
import { InboxContext } from '../../../context/inboxContext/InboxProvider';
import { NavigationContext } from '../../../context/navigationContext/NavigationProvider';
import useLoadMessages from '../../../utils/hooks/loadMessages';
import useSubToMessages from '../../../utils/hooks/subToMessages';

const Inbox = () => {
  const { selectedUser, setSelectedUser } = useContext(InboxContext);
  const { setTemporaryTab } = useContext(NavigationContext);

  const [loadUserMessages, { data: friendsData, loading: friendsLoading }] =
    useLoadMessages(setSelectedUser);
  useSubToMessages();

  // TODO: some nice cleanup function for async
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
                  friendsData &&
                  friendsData.getUserMessages
                    // TODO: I'll get you to work I swear
                    // .sort((a, b) => {
                    //   if (
                    //     a.latestMessage &&
                    //     b.latestMessage &&
                    //     Object.prototype.hasOwnProperty.call(
                    //       a.latestMessage,
                    //       'createdAt'
                    //     ) &&
                    //     Object.prototype.hasOwnProperty.call(
                    //       b.latestMessage,
                    //       'createdAt'
                    //     ) &&
                    //     a.latestMessage.createdAt > b.latestMessage.createdAt
                    //   ) {
                    //     console.log('called');
                    //     return -1;
                    //   }

                    //   if (
                    //     a.latestMessage &&
                    //     b.latestMessage &&
                    //     Object.prototype.hasOwnProperty.call(
                    //       a.latestMessage,
                    //       'createdAt'
                    //     ) &&
                    //     !Object.prototype.hasOwnProperty.call(
                    //       b.latestMessage,
                    //       'createdAt'
                    //     )
                    //   )
                    //     return -1;
                    //   return 1;
                    // })
                    .map((userMObj) => {
                      if (userMObj.user.id === selectedUser) {
                        return (
                          <InboxFeed
                            key={userMObj.user.id}
                            feed={userMObj.messages.slice(0).reverse()}
                          />
                        );
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
            <LoaderComponent />
          ) : (
            <Grid.Row centered>
              <div className="inboxComponent__friendList">
                {friendsData &&
                  friendsData.getUserMessages &&
                  friendsData.getUserMessages.map((userMObj) => (
                    <InboxUserCard
                      key={userMObj.user.id}
                      userID={userMObj.user.id}
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
