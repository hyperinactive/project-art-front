import { useLazyQuery } from '@apollo/client';
import { GET_POST } from '../../graphql';

const useLoadPost = (postID) =>
  useLazyQuery(GET_POST, {
    variables: {
      postID,
    },
    pollInterval: 1500,
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

export default useLoadPost;
