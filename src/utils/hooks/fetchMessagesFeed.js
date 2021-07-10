/* eslint-disable no-param-reassign */
import { useApolloClient, useLazyQuery } from '@apollo/client';
import { cloneDeep } from '@apollo/client/utilities';
import { GET_MORE_MESSAGES, GET_USER_MESSAGES } from '../../graphql';

const useFetchMessagesFeed = (
  selectedUser,
  setCanLoadMore,
  setCursorTimestamp
) => {
  const { cache } = useApolloClient();

  return useLazyQuery(GET_MORE_MESSAGES, {
    onCompleted: (data) => {
      setCanLoadMore(data.getUserMessagesFeed.hasMoreItems);
      setCursorTimestamp(data.getUserMessagesFeed.nextCursor);

      const cacheData = cache.readQuery({ query: GET_USER_MESSAGES });
      const cacheClone = cloneDeep(cacheData);
      Object.entries(cacheClone.getUserMessages).forEach((entry) => {
        if (entry[1].user.id.toString() === selectedUser.toString()) {
          entry[1].messages = [
            ...entry[1].messages,
            ...data.getUserMessagesFeed.messages,
          ];
        }
      });

      cache.writeQuery({
        query: GET_USER_MESSAGES,
        data: cacheClone,
      });
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
export default useFetchMessagesFeed;
