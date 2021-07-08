import { useMutation } from '@apollo/client';
import { cloneDeep } from 'lodash';
import { CREATE_PROJECT_POST } from '../../graphql';

const useCreatePost = (state, setState) =>
  useMutation(CREATE_PROJECT_POST, {
    update: (cache, { data: { createProjectPost } }) => {
      cache.modify({
        fields: {
          getFeed: (previous) => {
            const previousClone = cloneDeep(previous);
            // cannot apppend new posts to a null, so check for it
            if (previousClone.posts === null) {
              previousClone.posts = [];
            }
            previousClone.posts = [
              cloneDeep(createProjectPost),
              ...previousClone.posts,
            ];
            return previousClone;
          },
        },
      });
    },
    onError: (err) => {
      console.log({ err });
      setState({
        ...state,
        errors: err.graphQLErrors[0].extensions.exception.errors,
      });
    },
    onCompleted: () => {
      setState({
        ...state,
        body: '',
        imageFile: null,
        previewImage: null,
      });
    },
  });

export default useCreatePost;
