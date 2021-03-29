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
      skills
      imageURL
      friends {
        id
      }
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

const UPDATE_USER = gql`
  mutation updateUser(
    $username: String!
    $status: String!
    $skills: String!
    $image: Upload
  ) {
    updateUser(
      username: $username
      status: $status
      skills: $skills
      image: $image
    ) {
      id
      username
      createdAt
      token
      imageURL
    }
  }
`;

const ADD_FRIEND = gql`
  mutation addFriend($userID: ID, $username: String) {
    addFriend(userID: $userID, username: $username) {
      id
      username
    }
  }
`;

export {
  REGISTER_USER,
  LOGIN_USER,
  GET_USER,
  GET_FRIENDS,
  UPDATE_USER,
  ADD_FRIEND,
};
