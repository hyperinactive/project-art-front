import { useMutation } from '@apollo/client';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext/UserProvider';
import { REGISTER_USER } from '../../graphql';

const useRegister = (username, email, password, confirmPassword, setErrors) => {
  const { login } = useContext(UserContext);

  return useMutation(REGISTER_USER, {
    // update will trigger if everything's went smoothly
    // returns proxy result
    update: (_, result) => {
      login(result.data.register);
      // take us to the home page if register succeeded
    },
    // it expects some variables to be sent for mutations
    variables: {
      username,
      email,
      password,
      confirmPassword,
    },
    // handle errors
    onError: (err) => {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
  });
};
export default useRegister;
