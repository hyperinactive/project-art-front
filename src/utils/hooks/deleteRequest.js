const { useMutation } = require('@apollo/client');

const { GET_USER_REQUESTS, DELETE_REQUEST } = require('../../graphql');
const { default: readCacheCopy } = require('../readCacheCopy');

const useDeleteRequest = () =>
  useMutation(DELETE_REQUEST, {
    update: (cache, result) => {
      const cacheDataClone = readCacheCopy(cache, GET_USER_REQUESTS);

      // update cache only if there is one
      if (
        cacheDataClone.getUserRequests &&
        cacheDataClone.getUserRequests.length > 0
      ) {
        cacheDataClone.getUserRequests = cacheDataClone.getUserRequests.filter(
          (item) => item.id !== result.data.deleteRequest.id
        );

        cache.writeQuery({
          query: GET_USER_REQUESTS,
          data: cacheDataClone,
        });
      }
    },
    onError: (error) => {
      console.log({ error });
    },
  });

export default useDeleteRequest;
