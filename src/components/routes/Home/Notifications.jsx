/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import { useLazyQuery } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Feed } from 'semantic-ui-react';
import moment from 'moment';

import { baseURL, defaultAvatar } from '../../../appConfig';
import { UserContext } from '../../../context/userContext/UserProvider';
import { GET_USER_REQUESTS } from '../../../graphql/requestGQL';

// TODO:
// this is just a placeholder
const Notifications = () => {
  const { user } = useContext(UserContext);
  const [loadRequests, { data }] = useLazyQuery(GET_USER_REQUESTS, {
    onCompleted: (dataV) => {
      console.log(dataV);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    loadRequests();
  }, []);

  return (
    <Feed className="notifications">
      {data &&
        data.getUserRequests &&
        data.getUserRequests.map((request) => {
          if (user.id === request.fromUser.id) {
            return (
              <Feed.Event className="notifications__event" key={request.id}>
                <Feed.Content>
                  <Feed.Summary>
                    <Feed.Content>
                      Friend request sent to{' '}
                      <Link
                        className="notifications__event__link"
                        to={`user/${request.toUser.id}`}
                      >
                        {request.toUser.username}
                      </Link>
                      <Feed.Date>
                        {moment(request.createdAt).fromNow()}
                      </Feed.Date>
                    </Feed.Content>
                  </Feed.Summary>
                  <Feed.Meta />
                </Feed.Content>
              </Feed.Event>
            );
          }
          return (
            <Feed.Event className="notifications__event" key={request.id}>
              <Feed.Label>
                <Link
                  className="notifications__event__link"
                  to={`user/${request.fromUser.id}`}
                >
                  <img
                    src={
                      request.fromUser.imageURL
                        ? `${baseURL}/files/${request.fromUser.imageURL}`
                        : defaultAvatar
                    }
                  />
                </Link>
              </Feed.Label>
              <Feed.Content>
                <Feed.Summary>
                  <Link
                    className="notifications__event__link"
                    to={`user/${request.fromUser.id}`}
                  >
                    {request.fromUser.username}
                  </Link>
                  <span> wants to be your friend!</span>
                </Feed.Summary>
                <Feed.Date>{moment(request.createdAt).fromNow()}</Feed.Date>

                <Feed.Meta />
              </Feed.Content>
            </Feed.Event>
          );
        })}
    </Feed>
  );
};

export default Notifications;
