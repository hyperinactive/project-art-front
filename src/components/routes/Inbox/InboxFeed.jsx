import React, { useContext } from 'react';
import { Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ScrollableFeed from 'react-scrollable-feed';

import { UserContext } from '../../../context/UserProvider';

const InboxFeed = ({ feed }) => {
  const { user } = useContext(UserContext);

  return (
    <ScrollableFeed className="inboxComponent__chat__inboxFeed">
      {feed.map((message) => (
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
      ))}
    </ScrollableFeed>
  );
};

InboxFeed.defaultProps = {
  feed: {},
};

InboxFeed.propTypes = {
  feed: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      content: PropTypes.string,
      createdAt: PropTypes.string,
      fromUser: PropTypes.shape({
        id: PropTypes.string,
        username: PropTypes.string,
      }),
    })
  ),
};

export default InboxFeed;
