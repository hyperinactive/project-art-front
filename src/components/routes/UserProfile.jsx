import { useLazyQuery, useMutation } from '@apollo/client';
import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Image, Button } from 'semantic-ui-react';

import LoaderComponent from '../shared/LoaderComponent';
import {
  backgroundGradientInverted,
  baseURL,
  defaultAvatar,
  logo,
} from '../../appConfig';
import { NavigationContext } from '../../context/navigationContext/NavigationProvider';
import { UserContext } from '../../context/userContext/UserProvider';

import {
  GET_USER,
  GET_USER_FRIENDS,
  GET_USER_PROJECTS,
  SEND_FRIEND_REQUEST,
} from '../../graphql';
import prettyString from '../../utils/prettyString';

const isFriendsWith = (friends, userID) =>
  friends.find((friend) => friend.id.toString() === userID.toString());

const UserProfile = () => {
  const { user } = useContext(UserContext);
  const params = useParams();
  const history = useHistory();

  const { userID: fUserID } = params;
  const [isFriend, setIsFriend] = useState(false);
  const { setTemporaryTab, setActiveItem } = useContext(NavigationContext);

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
    useLazyQuery(GET_USER_FRIENDS, {
      variables: {
        userID: fUserID,
      },
      onError: (error) => {
        console.log(error);
      },
    });

  const [loadProjects, { data: projectsData, loading: projectsLoading }] =
    useLazyQuery(GET_USER_PROJECTS, {
      variables: {
        userID: fUserID,
      },
      onError: (error) => {
        console.log(error);
      },
    });

  // const [checkFrReq] = useLazyQuery(CHECK_FRIEND_REQUESTS, {
  //   variables: {
  //     userID: fUserID,
  //   },
  //   onCompleted: (dataV) => {
  //     console.log(dataV);
  //   },
  //   onError: (errorV) => {
  //     console.log(errorV);
  //   },
  // });

  // const [addFriend] = useAddFriend(setIsFriend, fUserID);
  const [addFriend] = useMutation(SEND_FRIEND_REQUEST, {
    variables: {
      userID: fUserID,
    },
    onCompleted: (dataF) => {
      console.log(dataF);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (user) {
      loadUser();
      loadFriends();
      loadProjects();
    } else {
      history.push('/');
    }
  }, [friendsData]);

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
                    addFriend();
                  }}
                >
                  Add friend
                </Button>
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
