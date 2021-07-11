import { useLazyQuery } from '@apollo/client';

import { GET_USER_MESSAGES } from '../../graphql';

const useLoadMessages = (setSelectedUser) =>
  useLazyQuery(GET_USER_MESSAGES, {
    onCompleted: (data) => {
      console.log(data.getUserMessages);
      if (data.getUserMessages.length > 0) {
        setSelectedUser(data.getUserMessages[0].user.id);
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

export default useLoadMessages;
