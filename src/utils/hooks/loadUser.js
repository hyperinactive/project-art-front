import { useLazyQuery } from '@apollo/client';
import { baseURL } from '../../appConfig';
import { GET_USER } from '../../graphql';

const useLoadUser = (setState) =>
  useLazyQuery(GET_USER, {
    onCompleted: (data) => {
      setState((state) => ({
        ...state,
        username: data.getUser.username,
        skills: data.getUser.skills,
        status: data.getUser.status,
      }));
      if (data.getUser.imageURL) {
        setState((state) => ({
          ...state,
          initialImage: `${baseURL}/files/${data.getUser.imageURL}`,
          previewImage: `${baseURL}/files/${data.getUser.imageURL}`,
          imageFile: `${baseURL}/files/${data.getUser.imageURL}`,
        }));
      }
    },
    onError: (err) => {
      console.log(err);
      setState((state) => ({
        ...state,
        errors: err.graphQLErrors[0].extensions.exception.errors,
      }));
    },
  });

export default useLoadUser;
