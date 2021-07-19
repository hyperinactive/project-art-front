/* eslint-disable jsx-a11y/alt-text */
import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Image } from 'semantic-ui-react';
import moment from 'moment';

import { baseURL, defaultAvatar } from '../../../appConfig';
import { UserContext } from '../../../context/userContext/UserProvider';
import { DELETE_REQUEST, GET_USER_REQUESTS } from '../../../graphql/requestGQL';
import readCacheCopy from '../../../utils/readCacheCopy';
import {
  ACCEPT_REQUEST,
  GET_FRIENDS,
  GET_USER_FRIENDS,
} from '../../../graphql';

const Notifications = () => {
  const { user } = useContext(UserContext);
  const [loadRequests, { data }] = useLazyQuery(GET_USER_REQUESTS, {});
  const [deleteRequest] = useMutation(DELETE_REQUEST, {
    update: (cache, result) => {
      const cacheDataClone = readCacheCopy(cache, GET_USER_REQUESTS);

      // update cache only if there is one
      if (
        cacheDataClone.getUserRequests &&
        cacheDataClone.getUserRequests.length > 0
      ) {
        cacheDataClone.getUserRequests = cacheDataClone.getUserRequests.filter(
          (item) => item.id !== result.data.deleteRequest.id
        );

        cache.writeQuery({
          query: GET_USER_REQUESTS,
          data: cacheDataClone.getUserRequests,
        });
      }
    },
    onError: (error) => {
      console.log({ error });
    },
  });

  const [acceptRequest] = useMutation(ACCEPT_REQUEST, {
    update: (cache, result) => {
      const cacheDataClone = readCacheCopy(cache, GET_USER_REQUESTS);

      if (
        cacheDataClone.getUserRequests &&
        cacheDataClone.getUserRequests.length > 0
      ) {
        cacheDataClone.getUserRequests = cacheDataClone.getUserRequests.filter(
          (item) => item.id !== result.data.deleteRequest.id
        );

        cache.writeQuery({
          query: GET_USER_REQUESTS,
          data: cacheDataClone,
        });
      }

      const friends = cache.readQuery({
        query: GET_FRIENDS,
      });

      if (friends !== null) {
        const friendsClone = {
          getFriends: [],
        };
        Object.entries(friends.getFriends).forEach((friend) => {
          friendsClone.getFriends.push(friend[1]);
        });

        friendsClone.getFriends.push(result.data.acceptFriendRequest.receiver);

        cache.writeQuery({
          query: GET_FRIENDS,
          data: friendsClone.getFriends,
        });
      }

      const userFriends = cache.readQuery({
        query: GET_USER_FRIENDS,
        variables: {
          userID: user.id,
        },
      });

      if (userFriends !== null) {
        const uFriendsClone = {
          getUserFriends: [],
        };

        Object.entries(userFriends.getUserFriends).forEach((friend) => {
          uFriendsClone.getUserFriends.push(friend[1]);
        });
        uFriendsClone.getUserFriends.push(result.data.addFriend.sender);

        cache.writeQuery({
          query: GET_USER_FRIENDS,
          variables: {
            userID: user.id,
          },
          data: uFriendsClone,
        });
      }
    },
  });

  useEffect(() => {
    loadRequests();
  }, []);

  return (
    <div className="notifications">
      {data &&
        data.getUserRequests &&
        data.getUserRequests.map((request) => {
          if (user.id === request.fromUser.id) {
            return (
              <div className="notifications__event" key={request.id}>
                <div className="notifications__event__left">
                  <div className="notifications__event__left__content">
                    <div>
                      Friend request sent to{' '}
                      <Link className="link" to={`user/${request.toUser.id}`}>
                        {request.toUser.username}
                      </Link>
                    </div>

                    <div className="notifications__event__left__content__date">
                      {moment(request.createdAt).fromNow()}
                    </div>
                  </div>
                </div>
                <div className="notifications__event__right">
                  <Dropdown
                    pointing="right"
                    icon="caret square left outline"
                    onClick={(e) => {
                      e.preventDefault();
                    }}
                  >
                    <Dropdown.Menu>
                      <Dropdown.Item
                        text="Cancel"
                        icon="close"
                        onClick={() =>
                          deleteRequest({
                            variables: {
                              requestID: request.id,
                            },
                          })
                        }
                      />
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            );
          }
          return (
            <div className="notifications__event" key={request.id}>
              <div className="notifications__event__left">
                <Image
                  rounded
                  size="mini"
                  src={
                    request.fromUser.imageURL
                      ? `${baseURL}/files/${request.fromUser.imageURL}`
                      : defaultAvatar
                  }
                />
                <div className="notifications__event__left__info">
                  <div>
                    <Link className="link" to={`user/${request.fromUser.id}`}>
                      {request.fromUser.username}
                    </Link>
                    <span> wants to be your friend!</span>
                  </div>
                  <div>{moment(request.createdAt).fromNow()}</div>
                </div>
              </div>
              <div className="notifications__event__right">
                <Dropdown
                  pointing="right"
                  icon="caret square left outline"
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  <Dropdown.Menu>
                    <Dropdown.Item
                      text="Accept"
                      icon="check"
                      onClick={() =>
                        acceptRequest({
                          variables: {
                            requestID: request.id,
                          },
                        })
                      }
                    />
                    <Dropdown.Item
                      text="Decline"
                      icon="close"
                      onClick={() =>
                        deleteRequest({ variables: { requestID: request.id } })
                      }
                    />
                    <Dropdown.Item text="Block" icon="ban" />
                    <Dropdown.Item text="Report" icon="exclamation" />
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default Notifications;
