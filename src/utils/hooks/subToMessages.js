import { GET_USER_MESSAGES, NEW_MESSAGE } from '../../graphql';

/* eslint-disable no-param-reassign */
const { useSubscription } = require('@apollo/client');
const { cloneDeep } = require('lodash');

const useSubToMessages = (cache) =>
  useSubscription(NEW_MESSAGE, {
    onSubscriptionData: (data) => {
      if (data.subscriptionData.error) {
        console.log(data.subscriptionData.error);
      }

      const friendID = data.subscriptionData.data.newMessage.fromUser.id;

      const cacheData = cache.readQuery({
        query: GET_USER_MESSAGES,
      });
      const cacheClone = cloneDeep(cacheData);
      console.log(cacheClone.getUserMessages);

      Object.entries(cacheClone.getUserMessages).forEach((entry) => {
        if (entry[1].user.id === friendID) {
          entry[1].messages.unshift(data.subscriptionData.data.newMessage);
          entry[1].latestMessage = data.subscriptionData.data.newMessage;
        }
      });

      cache.writeQuery({
        query: GET_USER_MESSAGES,
        data: {
          getUserMessages: cacheClone.getUserMessages,
        },
      });
    },
  });

export default useSubToMessages;
