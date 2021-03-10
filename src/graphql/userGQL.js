import { gql } from '@apollo/client';

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

const GET_USER = gql`
  query getUser($userID: ID!) {
    getUser(userID: $userID) {
      id
      username
      email
      status
    }
  }
`;

export { REGISTER_USER, LOGIN_USER, GET_USER };
