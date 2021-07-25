import { useMutation } from '@apollo/client';
import { cloneDeep } from 'lodash';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext/UserProvider';
import { GET_USER, GET_USERS, UPDATE_USER } from '../../graphql';

const useUpdateUser = (setState) => {
  const { user, login } = useContext(UserContext);

  return useMutation(UPDATE_USER, {
    update: (cache, result) => {
      cache.writeQuery({
        query: GET_USER,
        variables: {
          userID: user.id,
        },
        data: result.data.updateUser,
      });

      const users = cache.readQuery({
        query: GET_USERS,
      });

      const usersClone = cloneDeep(users);

      if (usersClone !== null) {
        const filtered = usersClone.getUsers.map((e) => {
          if (e.id.toString() === user.id) {
            return result.data.updateUser;
          }
          return e;
        });

        cache.writeQuery({
          query: GET_USERS,
          data: {
            getUsers: filtered,
          },
        });
      }
    },
    onCompleted: (res) => {
      login(res.updateUser);
      setState((state) => ({
        ...state,
        successMessage: true,
      }));
    },
    onError: (err) => {
      console.log({ err });
      setState((state) => ({
        ...state,
        errors: err.graphQLErrors[0].extensions.exception.errors,
      }));
    },
  });
};

export default useUpdateUser;
