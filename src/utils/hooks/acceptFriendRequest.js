import { useMutation } from '@apollo/client';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext/UserProvider';

import {
  ACCEPT_REQUEST,
  GET_FRIENDS,
  GET_USER_FRIENDS,
  GET_USER_REQUESTS,
} from '../../graphql';
import readCacheCopy from '../readCacheCopy';

const useAcceptFriendRequest = () => {
  const { user } = useContext(UserContext);

  return useMutation(ACCEPT_REQUEST, {
    update: (cache, result) => {
      const cacheDataClone = readCacheCopy(cache, GET_USER_REQUESTS);
      console.log(cacheDataClone);

      if (
        cacheDataClone.getUserRequests &&
        cacheDataClone.getUserRequests.length > 0
      ) {
        cacheDataClone.getUserRequests = cacheDataClone.getUserRequests.filter(
          (item) =>
            item.id.toString() !== result.data.acceptFriendRequest.request.id
        );
        console.log(cacheDataClone);

        cache.writeQuery({
          query: GET_USER_REQUESTS,
          data: cacheDataClone,
        });
      }

      const friends = cache.readQuery({
        query: GET_FRIENDS,
      });

      console.log(friends);

      if (friends !== null) {
        const friendsClone = {
          getFriends: [],
        };
        Object.entries(friends.getFriends).forEach((friend) => {
          friendsClone.getFriends.push(friend[1]);
        });

        friendsClone.getFriends.push(result.data.acceptFriendRequest.receiver);

        console.log(friendsClone);

        cache.writeQuery({
          query: GET_FRIENDS,
          data: friendsClone,
        });
      }

      const userFriends = cache.readQuery({
        query: GET_USER_FRIENDS,
        variables: {
          userID: user.id,
        },
      });

      console.log(userFriends);

      if (userFriends !== null) {
        const uFriendsClone = {
          getUserFriends: [],
        };

        Object.entries(userFriends.getUserFriends).forEach((friend) => {
          uFriendsClone.getUserFriends.push(friend[1]);
        });
        uFriendsClone.getUserFriends.push(result.data.addFriend.sender);

        console.log(uFriendsClone);

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
};

export default useAcceptFriendRequest;
