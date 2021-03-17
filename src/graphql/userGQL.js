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
      status
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
      status
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

const GET_FRIENDS = gql`
  query getFriends {
    getFriends {
      id
      username
      imageURL
    }
  }
`;

export { REGISTER_USER, LOGIN_USER, GET_USER, GET_FRIENDS };
