import { useMutation } from '@apollo/client';
import { ADD_FRIEND, GET_FRIENDS, GET_USER_FRIENDS } from '../../graphql';

const useAddFriend = (setIsFriend, userID) =>
  useMutation(ADD_FRIEND, {
    variables: {
      userID,
    },
    // TODO: repetitive code
    update: (cache, result) => {
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

        friendsClone.getFriends.push(result.data.addFriend.receiver);

        cache.writeQuery({
          query: GET_FRIENDS,
          data: friendsClone.getFriends,
        });
      }

      const userFriends = cache.readQuery({
        query: GET_USER_FRIENDS,
        variables: {
          userID,
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
            userID,
          },
          data: uFriendsClone,
        });
      }
    },
    onCompleted: () => {
      setIsFriend(true);
    },
    onError: (err) => {
      console.log(err);
    },
  });

export default useAddFriend;
