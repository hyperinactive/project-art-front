import { useMutation } from '@apollo/client';
import { cloneDeep } from 'lodash';
import { CREATE_COMMENT, GET_COMMENTS } from '../../graphql';

const useCreateComment = (postID, comment, setErrors) =>
  useMutation(CREATE_COMMENT, {
    variables: {
      postID,
      body: comment,
    },
    update: (cache, result) => {
      const cacheData = cache.readQuery({
        query: GET_COMMENTS,
        variables: {
          postID,
        },
      });

      const cacheDataClone = cloneDeep(cacheData);

      cacheDataClone.getComments = [
        ...cacheData.getComments,
        result.data.createComment,
      ];

      cache.writeQuery({
        query: GET_COMMENTS,
        variables: {
          postID,
        },
        data: {
          getComments: cacheDataClone.getComments,
        },
      });
    },
    onError: (err) => {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });

export default useCreateComment;
