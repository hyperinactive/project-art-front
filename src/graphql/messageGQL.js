import { gql } from '@apollo/client';
import { MESSAGE_FIELDS } from './fragments';

const GET_MESSAGES = gql`
  ${MESSAGE_FIELDS}
  query getMessages($toUserID: ID!) {
    getMessages(toUserID: $toUserID) {
      ...MessageFields
    }
  }
`;

const SEND_MESSAGE = gql`
  ${MESSAGE_FIELDS}
  mutation sendMessage($toUserID: ID!, $content: String!) {
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

const GET_MORE_MESSAGES = gql`
  ${MESSAGE_FIELDS}
  query getUserMessagesFeed($userID: ID!, $cursorTimestamp: String) {
    getUserMessagesFeed(userID: $userID, cursorTimestamp: $cursorTimestamp) {
      messages {
        ...MessageFields
      }
      hasMoreItems
      nextCursor
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

export {
  GET_MESSAGES,
  SEND_MESSAGE,
  NEW_MESSAGE,
  GET_USER_MESSAGES,
  GET_MORE_MESSAGES,
};
