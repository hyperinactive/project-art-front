import { gql } from '@apollo/client';

const DELETE_COMMENT = gql`
  mutation deleteComment($postID: ID!, $commentID: ID!) {
    deleteComment(postID: $postID, commentID: $commentID) {
      id
      createdAt
      username
      body
    }
  }
`;

const CREATE_COMMENT = gql`
  mutation createComment($postID: ID!, $body: String!) {
    createComment(postID: $postID, body: $body) {
      id
      createdAt
      username
      body
    }
  }
`;

// eslint-disable-next-line import/prefer-default-export
export { DELETE_COMMENT, CREATE_COMMENT };
