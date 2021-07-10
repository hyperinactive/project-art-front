/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import React, { useContext, useEffect, useState } from 'react';
import { Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ScrollableFeed from 'react-scrollable-feed';
import { Waypoint } from 'react-waypoint';

import useFetchMessagesFeed from '../../../utils/hooks/fetchMessagesFeed';
import { UserContext } from '../../../context/userContext/UserProvider';
import { InboxContext } from '../../../context/inboxContext/InboxProvider';

const InboxFeed = ({ feed }) => {
  const { user } = useContext(UserContext);
  const { selectedUser } = useContext(InboxContext);
  const [cursorTimestamp, setCursorTimestamp] = useState(null);
  const [canLoadMore, setCanLoadMore] = useState(true);

  const [fetchMore] = useFetchMessagesFeed(
    selectedUser,
    setCanLoadMore,
    setCursorTimestamp
  );

  const handleLoadMore = (userID) => {
    console.log(userID);
    console.log(cursorTimestamp);
    if (canLoadMore)
      fetchMore({
        variables: {
          userID,
          cursorTimestamp,
        },
      });
  };

  useEffect(() => {
    if (feed !== null && feed.length > 0) setCursorTimestamp(feed[0].createdAt);
  }, []);

  return (
    <ScrollableFeed className="inboxFeed">
      {feed.map((message, i) => (
        <React.Fragment key={message.id}>
          {i === 0 && (
            <Waypoint
              onEnter={() => {
                handleLoadMore(selectedUser);
              }}
            />
          )}
          <Popup
            style={{ opacity: 0.9 }}
            trigger={
              <div
                className={`inboxFeed__message ${
                  message.fromUser.id === user.id ? 'sender' : 'receiver'
                }`}
              >
                {message.content}
              </div>
            }
            content={moment(message.createdAt).format('DD-MMMM-YYYY @ h:mm a')}
            inverted
          />
        </React.Fragment>
      ))}
    </ScrollableFeed>
  );
};

InboxFeed.defaultProps = {
  feed: [],
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
