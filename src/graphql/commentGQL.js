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

const GET_COMMENTS = gql`
  query getComments($postID: ID!) {
    getComments(postID: $postID) {
      id
      createdAt
      body
      user {
        id
        username
        imageURL
      }
    }
  }
`;

export { DELETE_COMMENT, CREATE_COMMENT, GET_COMMENTS };
