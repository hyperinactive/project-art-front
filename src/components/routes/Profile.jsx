/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { cloneDeep } from '@apollo/client/utilities';
import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { Button, Grid, Header, Image, Loader } from 'semantic-ui-react';
import { UserContext } from '../../context/UserProvider';

import { ADD_FRIEND, GET_FRIENDS, GET_USER } from '../../graphql';

const isFriendsWith = (friends, user) =>
  friends.find((friend) => friend.id.toString() === user.id.toString());

const Profile = () => {
  const { user } = useContext(UserContext);
  const params = useParams();
  const { userID } = params;
  const [isFriend, setIsFriend] = useState(false);

  const { data, loading, error } = useQuery(GET_USER, {
    variables: {
      userID,
    },
    onError: (err) => {
      console.log(err);
      // console.log(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

  const [loadFriends, { data: fData, loading: fLoading }] = useLazyQuery(
    GET_FRIENDS,
    {
      variables: {
        userID,
      },
      onCompleted: () => {
        console.log(fData);
        if (!isFriendsWith(fData.getFriends, user)) {
          setIsFriend(true);
        }
      },
    }
  );

  const [addFriend, { data: aData, loading: aLoading }] = useMutation(
    ADD_FRIEND,
    {
      update: (cache, result) => {
        // const friends = cache.readQuery({
        //   query: GET_USER,
        //   variables: {
        //     userID,
        //   },
        // });
        // TODO: the cache doesn't track user's friends yet
        // when (if) it does, update it
      },
      onCompleted: () => {
        console.log('we friends now, yay!');
        setIsFriend(true);
      },
    }
  );

  useEffect(() => {
    if (user) {
      loadFriends();
    }
  }, [user]);

  if (fData && fData.getFriends) {
    if (isFriendsWith(fData.getFriends, user)) {
      console.log('set');
      setIsFriend(true);
    }
  }

  if (error) {
    return <Redirect to="/404" />;
  }

  return (
    <div className="profile">
      {loading ? (
        <Loader size="huge" active>
          Computing, things, beep bop
        </Loader>
      ) : (
        <>
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
                    data.getUser.imageURL
                      ? `http://localhost:4000/files/${data.getUser.imageURL}`
                      : `${process.env.PUBLIC_URL}/defaultAvatar.jpeg`
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
              {user && userID !== user.id ? (
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
                          userID,
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
        </>
      )}
    </div>
  );
};

export default Profile;
