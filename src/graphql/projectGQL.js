import { gql } from '@apollo/client';

const GET_PROJECTS = gql`
  query getProjects {
    getProjects {
      id
      name
      description
      memberCount
      owner {
        id
        username
      }
    }
  }
`;

const GET_PROJECT = gql`
  query getProject($projectID: ID!) {
    getProject(projectID: $projectID) {
      id
      name
      description
      memberCount
      owner {
        id
        username
      }
    }
  }
`;

const CREATE_PROJECT = gql`
  mutation createProject($name: String!) {
    createProject(name: $name) {
      id
      name
      description
      memberCount
      owner {
        id
        username
      }
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
      name
      description
      memberCount
      owner {
        id
        username
      }
      members {
        id
        username
      }
    }
  }
`;

const GET_USER_PROJECTS = gql`
  query getUserProjects {
    getUserProjects {
      id
      name
    }
  }
`;

const GET_MEMBERS = gql`
  query getProjectMembers($projectID: ID!) {
    getProjectMembers(projectID: $projectID) {
      id
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
