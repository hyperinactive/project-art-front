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

// eslint-disable-next-line import/prefer-default-export
export { DELETE_COMMENT };
