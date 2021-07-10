import { useLazyQuery } from '@apollo/client';
import { GET_FEED } from '../../graphql';

const useLoadPostFeed = (setCanLoadMore, setCursor) =>
  useLazyQuery(GET_FEED, {
    onCompleted: (data) => {
      console.log(data.getFeed);
      if (!data.getFeed.hasMoreItems) setCanLoadMore(false);
      setCursor(data.getFeed.nextCursor);
    },
    onError: (err) => {
      console.log({ err });
    },
  });

export default useLoadPostFeed;
