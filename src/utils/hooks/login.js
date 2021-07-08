import { useMutation } from '@apollo/client';
import { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { UserContext } from '../../context/userContext/UserProvider';
import { NavigationContext } from '../../context/navigationContext/NavigationProvider';
import { LOGIN_USER } from '../../graphql';

const useLogin = (username, password, setErrors) => {
  const { login } = useContext(UserContext);
  const { setActiveItem } = useContext(NavigationContext);
  const history = useHistory();

  return useMutation(LOGIN_USER, {
    // update will trigger if everything's went smoothly
    // returns proxy result
    update: (_, result) => {
      login(result.data.login);

      // take us to the home page if register succeeded
      history.push('/');
      setActiveItem('home');
    },
    variables: {
      username,
      password,
    },
    // handle errors
    onError: (err) => {
      // normally, you'd have lots of errors here
      // but we've written our serverside to have a single object with errors
      // it is in the extension
      // console.log(err.graphQLErrors[0].extensions.exception);

      setErrors(err.graphQLErrors[0].extensions.exception.errors);
      console.log(err.graphQLErrors[0].extensions.exception.errors);
    },
  });
};

export default useLogin;
