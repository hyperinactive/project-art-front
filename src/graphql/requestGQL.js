import { gql } from '@apollo/client';

// eslint-disable-next-line import/prefer-default-export
export const CHECK_FRIEND_REQUESTS = gql`
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

export const GET_USER_REQUESTS = gql`
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
