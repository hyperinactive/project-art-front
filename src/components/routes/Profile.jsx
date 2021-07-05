/* eslint-disable no-nested-ternary */
/* eslint-disable react/destructuring-assignment */
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { cloneDeep } from '@apollo/client/utilities';
import React, { useContext, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Button, Grid, Header, Image, Loader, Card } from 'semantic-ui-react';
import { baseURL, defaultAvatar } from '../../appConfig';
import { NavigationContext } from '../../context/NavigationProvider';
import { UserContext } from '../../context/UserProvider';

import {
  ADD_FRIEND,
  GET_FRIENDS,
  GET_USER,
  GET_USER_FRIENDS,
} from '../../graphql';

const isFriendsWith = (friends, userID) =>
  friends.find((friend) => friend.id.toString() === userID.toString());

const Profile = () => {
  const { user } = useContext(UserContext);
  const params = useParams();
  const history = useHistory();

  const { userID: fUserID } = params;
  const [isFriend, setIsFriend] = useState(false);
  const { setTemporaryTab, setActiveItem } = useContext(NavigationContext);

  // load user data to display
  const { data, loading } = useQuery(GET_USER, {
    variables: {
      userID: fUserID,
    },
    onCompleted: () => {
      if (isFriendsWith(data.getUser.friends, user.id) !== undefined) {
        setIsFriend(true);
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

  // const [loadFriends, { data: fData, loading: fLoading }] = useLazyQuery(
  //   GET_FRIENDS,
  //   {
  //     onCompleted: () => {
  //       if (isFriendsWith(fData.getFriends, fUserID) !== undefined) {
  //         setIsFriend(true);
  //       }
  //     },
  //   }
  // );

  // eslint-disable-next-line no-unused-vars
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

  // useEffect(() => {
  //   if (user) {
  //     // loadFriends();
  //     loadUser();
  //   }
  // }, [user]);

  // if (error) {
  //   return <Redirect to="/404" />;
  // }

  return (
    <div className="profile" style={{ textAlign: 'center' }}>
      {loading ? (
        <Loader size="huge" active>
          Computing, things, beep bop
        </Loader>
      ) : (
        data &&
        data.getUser && (
          <>
            <Card className="profile__info">
              <Grid
                textAlign="center"
                style={{ height: '75vh' }}
                verticalAlign="middle"
              >
                <Grid.Column style={{ maxWidth: 450 }}>
                  <Header as="h2" icon textAlign="center">
                    <Image
                      style={{ width: 80 }}
                      src={
                        data && data.getUser && data.getUser.imageURL
                          ? `${baseURL}/files/${data.getUser.imageURL}`
                          : defaultAvatar
                      }
                      rounded
                    />

                    <Header.Content style={{ margin: 10, marginTop: 20 }}>
                      {data.getUser.username}
                    </Header.Content>
                    <Header.Subheader>{data.getUser.status}</Header.Subheader>
                  </Header>
                  <Header as="h2" icon textAlign="center">
                    <Header.Content style={{ margin: 10, marginTop: 20 }}>
                      skills
                    </Header.Content>
                    <Header.Subheader>status</Header.Subheader>
                  </Header>
                  <Header as="h2" icon textAlign="center">
                    <Header.Content style={{ margin: 10, marginTop: 20 }}>
                      projects
                    </Header.Content>
                    <Header.Subheader>status</Header.Subheader>
                  </Header>
                  {user && fUserID !== user.id ? (
                    isFriend ? (
                      <Button
                        as="div"
                        type="button"
                        color="orange"
                        style={{ margin: 10 }}
                        disabled
                      >
                        Friends!
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
                    )
                  ) : (
                    <></>
                  )}
                </Grid.Column>
              </Grid>
            </Card>
          </>
        )
      )}
    </div>
  );
};

export default Profile;
