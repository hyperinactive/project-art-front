import { gql } from '@apollo/client';

const GET_POSTS = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        username
        body
        createdAt
      }
      commentCount
    }
  }
`;

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        username
        body
        createdAt
      }
      commentCount
    }
  }
`;

const REGISTER_USER = gql`
  mutation register(
    # $ -> variables
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

const LOGIN_USER = gql`
  mutation login(
    # $ -> variables
    $username: String!
    $password: String!
  ) {
    login(username: $username, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

// NOTE: don't forget to first declare $variables before calling the mutation
// because of id being passed to us we can tell which post is mutated
// apollo cache is smart enough to cache it immediately and I don't have to do it manually
const LIKE_POST = gql`
  mutation likeTogglePost($postID: ID!) {
    likeTogglePost(postID: $postID) {
      id
      likes {
        id
        username
        createdAt
      }
      likeCount
    }
  }
`;

const GET_POST = gql`
  query getPost($postID: ID!) {
    getPost(postID: $postID) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

// no need for returning values
const DELETE_POST = gql`
  mutation deletePost($postID: ID!) {
    deletePost(postID: $postID)
  }
`;

export {
  GET_POSTS,
  GET_POST,
  CREATE_POST,
  DELETE_POST,
  REGISTER_USER,
  LOGIN_USER,
  LIKE_POST,
};
