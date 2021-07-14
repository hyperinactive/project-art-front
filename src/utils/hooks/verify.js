import { useMutation } from '@apollo/client';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext/UserProvider';
import { VERIFY } from '../../graphql';

const useVerify = () => {
  const { login } = useContext(UserContext);

  return useMutation(VERIFY, {
    update: (_, result) => {
      login(result.data.verifyUser);
    },
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log({ error });
    },
  });
};

export default useVerify;
