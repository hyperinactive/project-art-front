import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { InboxContext } from '../../../context/inboxContext/InboxProvider';
import InboxUserCard from './InboxUserCard';

const InboxFriends = ({ friends }) => {
  const { selectedUser, setSelectedUser } = useContext(InboxContext);

  return (
    <div className="friendList">
      {friends.map((userMObj) => (
        <InboxUserCard
          key={userMObj.user.id}
          userID={userMObj.user.id}
          active={selectedUser === userMObj.user.id}
          username={userMObj.user.username}
          imageURL={userMObj.user.imageURL}
          latestMessageContent={
            userMObj.latestMessage ? userMObj.latestMessage.content : null
          }
          latestMessageFromID={
            userMObj.latestMessage ? userMObj.latestMessage.fromUser.id : null
          }
          onClick={() => setSelectedUser(userMObj.user.id)}
        />
      ))}
    </div>
  );
};

InboxFriends.defaultProps = {
  friends: [],
};

InboxFriends.propTypes = {
  friends: PropTypes.arrayOf(
    PropTypes.shape({
      user: PropTypes.shape({
        id: PropTypes.string,
        username: PropTypes.string,
        imageURl: PropTypes.string,
      }),
      latestMessage: PropTypes.shape({
        content: PropTypes.string,
        fromUser: PropTypes.shape({
          id: PropTypes.string,
        }),
      }),
    })
  ),
};

export default InboxFriends;
