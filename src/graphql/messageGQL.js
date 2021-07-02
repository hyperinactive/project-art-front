import { gql } from '@apollo/client';
import { MESSAGE_FIELDS } from './fragments';

const GET_MESSAGES = gql`
  ${MESSAGE_FIELDS}
  query getMessages($toUserID: String!) {
    getMessages(toUserID: $toUserID) {
      ...MessageFields
    }
  }
`;

const SEND_MESSAGE = gql`
  ${MESSAGE_FIELDS}
  mutation sendMessage($toUserID: String!, $content: String!) {
    sendMessage(toUserID: $toUserID, content: $content) {
      ...MessageFields
    }
  }
`;

const GET_USER_MESSAGES = gql`
  ${MESSAGE_FIELDS}
  query getUserMessages {
    getUserMessages {
      user {
        id
        username
        imageURL
      }
      messages {
        ...MessageFields
      }
      latestMessage {
        ...MessageFields
      }
    }
  }
`;

const NEW_MESSAGE = gql`
  ${MESSAGE_FIELDS}
  subscription newMessage {
    newMessage {
      ...MessageFields
    }
  }
`;

export { GET_MESSAGES, SEND_MESSAGE, NEW_MESSAGE, GET_USER_MESSAGES };
