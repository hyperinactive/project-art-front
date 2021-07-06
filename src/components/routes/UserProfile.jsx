import { useLazyQuery, useMutation } from '@apollo/client';
import { cloneDeep } from '@apollo/client/utilities';
import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Image, Button } from 'semantic-ui-react';

import LoaderComponent from '../shared/LoaderComponent';
import {
  backgroundGradientInverted,
  baseURL,
  defaultAvatar,
} from '../../appConfig';
import { NavigationContext } from '../../context/NavigationProvider';
import { UserContext } from '../../context/UserProvider';

import {
  ADD_FRIEND,
  GET_FRIENDS,
  GET_USER,
  GET_USER_FRIENDS,
  GET_USER_PROJECTS,
} from '../../graphql';
import prettyString from '../../utils';

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
      console.log(data);
      if (isFriendsWith(data.getUser.friends, user.id) !== undefined) {
        console.log('were friends');
        setIsFriend(true);
      } else {
        setIsFriend(false);
      }
      // controll the temp tab info
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
      onCompleted: () => {
        console.log(friendsData);
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
      onCompleted: () => {
        console.log(projectsData);
      },
      onError: (error) => {
        console.log(error);
      },
    });

  const [addFriend] = useMutation(ADD_FRIEND, {
    update: (cache, result) => {
      const friends = cache.readQuery({
        query: GET_FRIENDS,
      });

      const friendsClone = cloneDeep(friends);
      friendsClone.getFriends = [
        ...friendsClone.getFriends,
        result.data.addFriend,
      ];

      cache.writeQuery({
        query: GET_FRIENDS,
        data: {
          getFriends: friendsClone.getFriends,
        },
      });
    },
    onCompleted: () => {
      console.log('we friends now, yay!');
      setIsFriend(true);
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
  }, []);

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
                      src={backgroundGradientInverted}
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
                    addFriend({
                      variables: {
                        userID: fUserID,
                      },
                    });
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
