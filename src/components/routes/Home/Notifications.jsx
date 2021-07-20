/* eslint-disable jsx-a11y/alt-text */
import { useLazyQuery } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, Image } from 'semantic-ui-react';
import moment from 'moment';

import { baseURL, defaultAvatar } from '../../../appConfig';
import { UserContext } from '../../../context/userContext/UserProvider';
import { GET_USER_REQUESTS } from '../../../graphql/requestGQL';

import useDeleteRequest from '../../../utils/hooks/deleteRequest';
import useAcceptFriendRequest from '../../../utils/hooks/acceptFriendRequest';

const Notifications = () => {
  const { user } = useContext(UserContext);

  const [loadRequests, { data: { getUserRequests = {} } = {} }] = useLazyQuery(
    GET_USER_REQUESTS,
    {}
  );
  const [deleteRequest] = useDeleteRequest();
  const [acceptRequest] = useAcceptFriendRequest();

  useEffect(() => {
    loadRequests();
  }, []);

  return (
    <div className="notifications">
      {Object.keys(getUserRequests).length > 0 &&
        getUserRequests.map((request) => {
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
