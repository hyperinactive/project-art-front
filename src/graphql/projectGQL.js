import { gql } from '@apollo/client';
import { PROJECT_FIELDS } from './fragments';

const GET_PROJECTS = gql`
  ${PROJECT_FIELDS}
  query getProjects {
    getProjects {
      ...ProjectFields
    }
  }
`;

const GET_PROJECT = gql`
  ${PROJECT_FIELDS}
  query getProject($projectID: ID!) {
    getProject(projectID: $projectID) {
      ...ProjectFields
      members {
        id
      }
    }
  }
`;

const CREATE_PROJECT = gql`
  ${PROJECT_FIELDS}
  mutation createProject($name: String!) {
    createProject(name: $name) {
      ...ProjectFields
      members {
        id
        username
      }
    }
  }
`;

const ADD_MEMBER = gql`
  mutation addMember($projectID: ID!) {
    addMember(projectID: $projectID) {
      id
      username
      imageURL
    }
  }
`;

const GET_USER_PROJECTS = gql`
  query getUserProjects($userID: ID) {
    getUserProjects(userID: $userID) {
      id
      name
    }
  }
`;

const GET_MEMBERS = gql`
  query getProjectMembers($projectID: ID!) {
    getProjectMembers(projectID: $projectID) {
      id
      status
      username
      imageURL
    }
  }
`;

export {
  GET_PROJECTS,
  GET_PROJECT,
  CREATE_PROJECT,
  ADD_MEMBER,
  GET_USER_PROJECTS,
  GET_MEMBERS,
};
