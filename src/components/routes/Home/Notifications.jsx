/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/alt-text */
import { useLazyQuery } from '@apollo/client';
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Feed, Dropdown, Image } from 'semantic-ui-react';
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
              </div>
            );
          }
          return (
            <div className="notifications__event">
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
                    <Dropdown.Item text="Accept" icon="check" />
                    <Dropdown.Item text="Decline" icon="close" />
                    <Dropdown.Item text="Block" icon="ban" />
                    <Dropdown.Item text="Report" icon="exclamation" />
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            // <Feed.Event className="notifications__event" key={request.id}>
            //   <Feed.Label>
            //     <Link
            //       className="notifications__event__link"
            //       to={`user/${request.fromUser.id}`}
            //     >
            //       <img
            //         src={
            //           request.fromUser.imageURL
            //             ? `${baseURL}/files/${request.fromUser.imageURL}`
            //             : defaultAvatar
            //         }
            //       />
            //     </Link>
            //   </Feed.Label>
            //   <Feed.Content>
            //     <Feed.Summary>
            //       <Link
            //         className="notifications__event__link"
            //         to={`user/${request.fromUser.id}`}
            //       >
            //         {request.fromUser.username}
            //       </Link>
            //       <span> wants to be your friend!</span>
            //     </Feed.Summary>
            //     <Feed.Date>{moment(request.createdAt).fromNow()}</Feed.Date>

            //     <Feed.Meta />
            //   </Feed.Content>
            // </Feed.Event>
          );
        })}
    </Feed>
  );
};

export default Notifications;
