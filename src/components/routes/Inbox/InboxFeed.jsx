import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Popup, Loader } from 'semantic-ui-react';
import moment from 'moment';
import ScrollableFeed from 'react-scrollable-feed';

import { UserContext } from '../../../context/UserProvider';
import { GET_MESSAGES } from '../../../graphql';
import { InboxContext } from '../../../context/InboxProvider';

const InboxFeed = () => {
  const { user } = useContext(UserContext);
  const { selectedUser } = useContext(InboxContext);
  const { data: messages, loading } = useQuery(GET_MESSAGES, {
    variables: {
      toUserID: selectedUser,
    },
    onError: (err) => {
      console.log(err);
    },
  });

  return (
    <ScrollableFeed className="inboxComponent__chat__inboxFeed">
      {loading ? (
        <Loader size="huge" active>
          Computing, things, beep bop
        </Loader>
      ) : (
        messages &&
        messages.getMessages &&
        messages.getMessages.map((message) => (
          <Popup
            key={message.id}
            style={{ opacity: 0.9 }}
            trigger={
              <div
                className={`inboxComponent__chat__inboxFeed__message ${
                  message.fromUser.id === user.id ? 'sender' : 'receiver'
                }`}
              >
                {message.content}
              </div>
            }
            content={moment(message.createdAt).format('MMMM DD, YYYY @ h:mm a')}
            inverted
          />
        ))
      )}
    </ScrollableFeed>
  );
};

export default InboxFeed;
