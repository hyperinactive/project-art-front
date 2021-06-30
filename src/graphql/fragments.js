import { gql } from '@apollo/client';

export const MESSAGE_FIELDS = gql`
  fragment MessageFields on Message {
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
`;

export const COMMENT_FIELDS = gql`
  fragment CommentFields on Comment {
    id
    createdAt
    username
    body
  }
`;

export const POST_FIELDS = gql`
  fragment PostFields on Post {
    id
    body
    createdAt
    username
    imageURL
  }
`;

export const LIKE_FIELDS = gql`
  fragment LikeFields on Post {
    likes {
      id
      username
      createdAt
    }
    likeCount
  }
`;

export const USER_FIELDS = gql`
  fragment UserFields on User {
    id
    status
    imageURL
    username
  }
`;

export const PROJECT_FIELDS = gql`
  fragment ProjectFields on Project {
    id
    name
    description
    memberCount
    owner {
      id
      username
    }
  }
`;
