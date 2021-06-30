import { gql } from '@apollo/client';
import { USER_FIELDS } from './fragments';

const REGISTER_USER = gql`
  ${USER_FIELDS}
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
      ...UserFields
      email
      token
    }
  }
`;

const LOGIN_USER = gql`
  ${USER_FIELDS}
  mutation login(
    # $ -> variables
    $username: String!
    $password: String!
  ) {
    login(username: $username, password: $password) {
      ...UserFields
      email
      token
    }
  }
`;

const GET_USER = gql`
  ${USER_FIELDS}
  query getUser($userID: ID!) {
    getUser(userID: $userID) {
      ...UserFields
      email
      skills
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
  ${USER_FIELDS}
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
      ...UserFields
      token
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

const GET_USERS = gql`
  query getUsers {
    getUsers {
      id
      username
      imageURL
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
  GET_USERS,
};
