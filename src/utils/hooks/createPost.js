import { useMutation } from '@apollo/client';
// import { cloneDeep } from 'lodash';
import { CREATE_PROJECT_POST } from '../../graphql';

const useCreatePost = (setState) =>
  useMutation(CREATE_PROJECT_POST, {
    // TODO: update via subs, no need to do it twice
    // update: (cache, { data: { createProjectPost } }) => {
    //   cache.modify({
    //     fields: {
    //       getFeed: (previous) => {
    //         console.log(previous);
    //         console.log(createProjectPost);
    //         const previousClone = cloneDeep(previous);
    //         // cannot apppend new posts to a null, so check for it
    //         if (
    //           previousClone.posts === null ||
    //           previousClone.posts.length === 0
    //         ) {
    //           previousClone.posts = [cloneDeep(createProjectPost)];
    //           return previousClone;
    //         }
    //         previousClone.posts = [
    //           cloneDeep(createProjectPost),
    //           ...previousClone.posts,
    //         ];
    //         return previousClone;
    //       },
    //     },
    //   });
    // },
    onError: (err) => {
      console.log({ err });
      setState((state) => ({
        ...state,
        errors: err.graphQLErrors[0].extensions.exception.errors,
      }));
    },
    onCompleted: () => {
      setState((state) => ({
        ...state,
        body: '',
        imageFile: null,
        previewImage: null,
      }));
    },
  });

export default useCreatePost;
