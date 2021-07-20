const { useMutation } = require('@apollo/client');
const { SEND_FRIEND_REQUEST, GET_USER_REQUESTS } = require('../../graphql');

const useSendFriendRequest = (setIsSent, setErrors) =>
  useMutation(SEND_FRIEND_REQUEST, {
    update: (cache, result) => {
      const requests = cache.readQuery({ query: GET_USER_REQUESTS });

      if (requests !== null) {
        const requestsClone = {
          getUserRequests: [],
        };

        Object.entries(requests.getUserRequests).forEach((request) => {
          requestsClone.getUserRequests.push(request[1]);
        });

        requestsClone.getUserRequests.push(result.data.sendFriendRequest);

        cache.writeQuery({
          query: GET_USER_REQUESTS,
          data: requestsClone,
        });
      }
    },
    onCompleted: (dataF) => {
      setIsSent(true);
      console.log(dataF);
    },
    onError: (error) => {
      console.error({ error });
      setErrors(error.graphQLErrors[0].extensions.exception.errors);
    },
  });

export default useSendFriendRequest;
