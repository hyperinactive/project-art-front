import { gql } from '@apollo/client';
import { COMMENT_FIELDS } from './fragments';

const DELETE_COMMENT = gql`
  ${COMMENT_FIELDS}
  mutation deleteComment($postID: ID!, $commentID: ID!) {
    deleteComment(postID: $postID, commentID: $commentID) {
      ...CommentFields
    }
  }
`;

const CREATE_COMMENT = gql`
  ${COMMENT_FIELDS}
  mutation createComment($postID: ID!, $body: String!) {
    createComment(postID: $postID, body: $body) {
      ...CommentFields
    }
  }
`;

const GET_COMMENTS = gql`
  ${COMMENT_FIELDS}
  query getComments($postID: ID!) {
    getComments(postID: $postID) {
      ...CommentFields
      user {
        id
        username
        imageURL
      }
    }
  }
`;

export { DELETE_COMMENT, CREATE_COMMENT, GET_COMMENTS };
