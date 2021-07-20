import { useLazyQuery } from '@apollo/client';
import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Image, Button, Message } from 'semantic-ui-react';

import LoaderComponent from '../shared/LoaderComponent';
import {
  backgroundGradientInverted,
  baseURL,
  defaultAvatar,
  logo,
} from '../../appConfig';
import { NavigationContext } from '../../context/navigationContext/NavigationProvider';
import { UserContext } from '../../context/userContext/UserProvider';

import { GET_USER } from '../../graphql';
import prettyString from '../../utils/prettyString';
import useSendFriendRequest from '../../utils/hooks/sendFriendRequest';
import useLoadFriends from '../../utils/hooks/loadFriends';
import useLoadProjects from '../../utils/hooks/loadProjects';

const isFriendsWith = (friends, userID) =>
  friends.find((friend) => friend.id.toString() === userID.toString());

const UserProfile = () => {
  const { user } = useContext(UserContext);
  const params = useParams();
  const history = useHistory();

  const { userID: fUserID } = params;
  const [isFriend, setIsFriend] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errors, setErrors] = useState({});
  const { setTemporaryTab, setActiveItem } = useContext(NavigationContext);

  // -------------------------------------------------------------------------------

  // TODO: abstract query for both profiles and home
  // for now, stays here in the component
  // load user data to display
  const [loadUser, { data, loading }] = useLazyQuery(GET_USER, {
    variables: {
      userID: fUserID,
    },
    onCompleted: () => {
      if (isFriendsWith(data.getUser.friends, user.id) !== undefined) {
        setIsFriend(true);
      } else {
        setIsFriend(false);
      }
      setTemporaryTab({
        name: data.getUser.username,
        link: `/user/${data.getUser.id}`,
      });
      setActiveItem(data.getUser.username);
    },
    onError: () => {
      history.push('/404');
    },
  });

  const [loadFriends, { data: friendsData, loading: friendsLoading }] =
    useLoadFriends();
  const [loadProjects, { data: projectsData, loading: projectsLoading }] =
    useLoadProjects();
  const [sendFriendRequest] = useSendFriendRequest(setIsSent, setErrors);
  // -------------------------------------------------------------------------------
  useEffect(() => {
    if (user) {
      loadUser();
      loadFriends({
        variables: {
          userID: fUserID,
        },
      });
      loadProjects({
        variables: {
          userID: fUserID,
        },
      });
    } else {
      history.push('/');
    }
  }, [friendsData]);

  // TODO: make it modular
  if (projectsLoading || friendsLoading || loading) {
    return <LoaderComponent />;
  }

  return (
    <div className="userProfile">
      {data && data.getUser && (
        <>
          <div className="userProfile__background">
            <Image
              className="userProfile__background__image"
              rounded
              src={backgroundGradientInverted}
            />
          </div>
          <div className="userProfile__userInfo">
            <Image
              size="small"
              className="userProfile__userInfo__image"
              src={
                data.getUser.imageURL
                  ? `${baseURL}/files/${data.getUser.imageURL}`
                  : defaultAvatar
              }
            />
            <h3 className="userProfile__userInfo__username headline">
              {data.getUser.username}
            </h3>
          </div>
          <div className="userProfile__secondaryInfo">
            <div className="userProfile__secondaryInfo__projects">
              {projectsData &&
                projectsData.getUserProjects &&
                projectsData.getUserProjects.map((project) => (
                  <Link
                    to={`/projects/${project.id}`}
                    key={project.id}
                    className="userProfile__secondaryInfo__projects__project"
                  >
                    <Image
                      className="userProfile__secondaryInfo__projects__project__image"
                      rounded
                      src={logo}
                    />
                    <p>{prettyString(project.name, 9)}</p>
                  </Link>
                ))}
            </div>
            <div className="userProfile__secondaryInfo__personal">
              <p className="userProfile__secondaryInfo__personal__info">
                {data.getUser.email}
              </p>
              <p className="userProfile__secondaryInfo__personal__info">
                {data.getUser.status}
              </p>
              <p className="userProfile__secondaryInfo__personal__info">
                {data.getUser.skills}
              </p>
              {isFriend || fUserID.toString() === user.id.toString() ? (
                <Button
                  as="div"
                  type="button"
                  color="orange"
                  style={{ margin: 10 }}
                  disabled
                >
                  Familiar face!
                </Button>
              ) : (
                <Button
                  as="div"
                  type="button"
                  color="orange"
                  style={{ margin: 10 }}
                  onClick={(e) => {
                    e.preventDefault();
                    sendFriendRequest({
                      variables: {
                        userID: fUserID,
                      },
                    });
                  }}
                >
                  Add friend
                </Button>
              )}
              {data && data.getUser && isSent && (
                <Message
                  positive
                  style={{ textAlign: 'center', width: 'fit-content' }}
                >
                  <Message.Header>Success</Message.Header>
                  <p>{`Friend request sent to ${data.getUser.username}`}</p>
                </Message>
              )}
              {Object.prototype.hasOwnProperty.call(errors, 'alreadySent') && (
                <Message
                  negative
                  style={{ textAlign: 'center', width: 'fit-content' }}
                >
                  <Message.Header>Whoops</Message.Header>
                  <p>{`Friend request already sent to ${data.getUser.username}`}</p>
                </Message>
              )}
            </div>
            <div className="userProfile__secondaryInfo__friends">
              {friendsData &&
                friendsData.getUserFriends &&
                friendsData.getUserFriends.map((friend) => (
                  <Link
                    to={`/user/${friend.id}`}
                    key={friend.id}
                    className="userProfile__secondaryInfo__friends__friend"
                  >
                    <Image
                      className="userProfile__secondaryInfo__friends__friend__image"
                      rounded
                      src={
                        friend.imageURL
                          ? `${baseURL}/files/${friend.imageURL}`
                          : defaultAvatar
                      }
                    />
                    <p>{prettyString(friend.username, 9)}</p>
                  </Link>
                ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UserProfile;
