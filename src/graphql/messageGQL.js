import { gql } from '@apollo/client';

const GET_MESSAGES = gql`
  query getMessages($toUserID: String!) {
    getMessages(toUserID: $toUserID) {
      id
      createdAt
      content
      fromUser {
        id
        username
      }
      toUser {
        id
        username
      }
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation sendMessage($toUserID: String!, $content: String!) {
    sendMessage(toUserID: $toUserID, content: $content) {
      id
      createdAt
      content
      fromUser {
        id
        username
      }
      toUser {
        id
        username
      }
    }
  }
`;

export { GET_MESSAGES, SEND_MESSAGE };
