import { useLazyQuery } from '@apollo/client';
import { GET_USER_PROJECTS } from '../../graphql';

const useLoadProjects = () =>
  useLazyQuery(GET_USER_PROJECTS, {
    // onCompleted: (data) => {
    //   console.log(data);
    // },
    onError(err) {
      console.log(err);
    },
  });

export default useLoadProjects;
