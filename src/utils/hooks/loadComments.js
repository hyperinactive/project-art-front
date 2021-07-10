import { useLazyQuery } from '@apollo/client';
import { GET_COMMENTS } from '../../graphql';

const useLoadComments = (postID) =>
  useLazyQuery(GET_COMMENTS, {
    variables: {
      postID,
    },
    pollInterval: 1500,
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log({ error });
    },
  });

export default useLoadComments;
