import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { UserContext } from '../../../context/UserProvider';

const InboxFeed = ({ messages }) => {
  const { user } = useContext(UserContext);
  console.log(user);
  console.log(messages);

  return (
    <div className="inboxComponent__chat__inboxFeed">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`inboxComponent__chat__inboxFeed__message ${
            message.fromUser.id === user.id ? 'sender' : 'receiver'
          }`}
        >
          {message.content}
        </div>
      ))}
    </div>
  );
};

InboxFeed.defaultProps = {
  messages: {},
};

InboxFeed.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
      createdAt: PropTypes.string,
      fromUser: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }),
    })
  ),
};

export default InboxFeed;
