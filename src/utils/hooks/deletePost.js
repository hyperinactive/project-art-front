import { useMutation } from '@apollo/client';
import { cloneDeep } from 'lodash';
import { DELETE_POST, GET_FEED } from '../../graphql';

const useDeletePost = (projectID, postID) =>
  useMutation(DELETE_POST, {
    variables: {
      postID,
    },
    update(cache) {
      const postCache = cache.readQuery({
        query: GET_FEED,
        variables: {
          projectID,
        },
      });

      console.log(postCache);

      const postCacheClone = cloneDeep(postCache);

      postCacheClone.getFeed.posts = postCacheClone.getFeed.posts.filter(
        (item) => item.id !== postID
      );

      cache.writeQuery({
        query: GET_FEED,
        variables: {
          projectID,
        },
        data: postCacheClone,
      });
    },
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (err) => {
      console.log(err);
    },
  });

export default useDeletePost;
