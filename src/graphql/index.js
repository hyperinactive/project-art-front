import { gql } from '@apollo/client';

const GET_POSTS_QUERY = gql`
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

export { GET_POSTS_QUERY, CREATE_POST, REGISTER_USER, LOGIN_USER };
