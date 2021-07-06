/* eslint-disable no-param-reassign */
import React, { useContext, useEffect, useState } from 'react';
import { Popup } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ScrollableFeed from 'react-scrollable-feed';
import { Waypoint } from 'react-waypoint';
import { useLazyQuery, useApolloClient } from '@apollo/client';
import { cloneDeep } from '@apollo/client/utilities';

import { UserContext } from '../../../context/UserProvider';
import { InboxContext } from '../../../context/InboxProvider';
import {
  GET_MORE_MESSAGES,
  GET_USER_MESSAGES,
} from '../../../graphql/messageGQL';

const InboxFeed = ({ feed }) => {
  const { cache } = useApolloClient();
  const { user } = useContext(UserContext);
  const { selectedUser } = useContext(InboxContext);
  const [cursorTimestamp, setCursorTimestamp] = useState(null);
  const [canLoadMore, setCanLoadMore] = useState(true);

  const [fetchMore, { data }] = useLazyQuery(GET_MORE_MESSAGES, {
    onCompleted: () => {
      console.log(data);
      setCanLoadMore(data.getUserMessagesFeed.hasMoreItems);
      setCursorTimestamp(data.getUserMessagesFeed.nextCursor);

      const cacheData = cache.readQuery({ query: GET_USER_MESSAGES });
      const cacheClone = cloneDeep(cacheData);
      Object.entries(cacheClone.getUserMessages).forEach((entry) => {
        if (entry[1].user.id.toString() === selectedUser.toString()) {
          entry[1].messages = [
            ...entry[1].messages,
            ...data.getUserMessagesFeed.messages,
          ];
        }
      });

      cache.writeQuery({
        query: GET_USER_MESSAGES,
        data: cacheClone,
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });

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
    <ScrollableFeed className="inboxComponent__chat__inboxFeed">
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
                className={`inboxComponent__chat__inboxFeed__message ${
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
