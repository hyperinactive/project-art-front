import { useSubscription } from '@apollo/client';
import { cloneDeep } from 'lodash';
import { GET_FEED, NEW_POST } from '../../graphql';

const useSubToPosts = (projectID, cache) =>
  useSubscription(NEW_POST, {
    onSubscriptionData: (data) => {
      if (data.subscriptionData.error) {
        console.log(data.subscriptionData.error);
      }

      const cacheData = cache.readQuery({
        query: GET_FEED,
        variables: {
          projectID,
        },
      });
      const cacheClone = cloneDeep(cacheData);

      if (
        !cacheClone.getFeed ||
        !cacheClone.getFeed.posts ||
        cacheClone.getFeed.posts === []
      ) {
        cacheClone.getFeed.posts = [data.subscriptionData.data.newPost, ...[]];
      } else {
        cacheClone.getFeed.posts = [
          cloneDeep(data.subscriptionData.data.newPost),
          ...cacheClone.getFeed.posts,
        ];
      }

      cache.writeQuery({
        query: GET_FEED,
        variables: {
          projectID,
        },
        data: cacheClone,
      });
    },
  });

export default useSubToPosts;
