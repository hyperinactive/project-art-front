import { useLazyQuery } from '@apollo/client';
import { GET_FRIENDS } from '../../graphql';

const useLoadFriends = () =>
  useLazyQuery(GET_FRIENDS, {
    onCompleted: (data) => {
      console.log(data.getFriends);
    },
  });

export default useLoadFriends;
