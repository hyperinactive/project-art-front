import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
const CHECK_FRIEND_REQUESTS = gql`
  query checkFriendRequests($userID: ID!) {
    checkFriendRequests(userID: $userID) {
      request {
        id
        createdAt
      }
      isSent
    }
  }
`;

const GET_USER_REQUESTS = gql`
  query getUserRequests {
    getUserRequests {
      id
      createdAt
      type
      fromUser {
        id
        username
        imageURL
      }
      toUser {
        id
        username
        imageURL
      }
    }
  }
`;

const DELETE_REQUEST = gql`
  mutation deleteRequest($requestID: ID!) {
    deleteRequest(requestID: $requestID) {
      id
    }
  }
`;

export { CHECK_FRIEND_REQUESTS, GET_USER_REQUESTS, DELETE_REQUEST };
