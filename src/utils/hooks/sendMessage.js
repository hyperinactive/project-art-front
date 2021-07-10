/* eslint-disable no-param-reassign */
import { useMutation } from '@apollo/client';
import { cloneDeep } from 'lodash';
import { GET_USER_MESSAGES, SEND_MESSAGE } from '../../graphql';

const useSendMessage = (selectedUser, message) =>
  useMutation(SEND_MESSAGE, {
    variables: {
      toUserID: selectedUser,
      content: message.content,
    },
    onCompleted: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
    update: (cache, result) => {
      const userID = result.data.sendMessage.toUser.id;
      const cacheData = cache.readQuery({
        query: GET_USER_MESSAGES,
      });

      const cacheClone = cloneDeep(cacheData);

      Object.entries(cacheClone.getUserMessages).forEach((entry) => {
        if (entry[1].user.id === userID) {
          entry[1].messages.unshift(result.data.sendMessage);
          entry[1].latestMessage = result.data.sendMessage;
        }
      });

      cache.writeQuery({
        query: GET_USER_MESSAGES,
        data: cacheClone,
      });
    },
  });

export default useSendMessage;
