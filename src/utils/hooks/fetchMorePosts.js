import { cloneDeep } from 'lodash';

const useFetchMorePosts = (
  fetchMore,
  setCanLoadMore,
  setCursor,
  projectID,
  cursor
) =>
  fetchMore({
    variables: {
      projectID,
      cursor,
    },
    updateQuery: (prev, { fetchMoreResult }) => {
      if (!fetchMoreResult.getFeed.hasMoreItems) {
        setCanLoadMore(false);
      }

      const prevClone = cloneDeep(prev);
      prevClone.getFeed.posts = [
        ...prevClone.getFeed.posts,
        ...fetchMoreResult.getFeed.posts,
      ];
      prevClone.getFeed.hasMoreItems = fetchMoreResult.getFeed.hasMoreItems;
      prevClone.getFeed.nextCursor = fetchMoreResult.getFeed.nextCursor;

      setCursor(fetchMoreResult.getFeed.nextCursor);
      return prevClone;
    },
  });

export default useFetchMorePosts;
