import { gql } from '@apollo/client';

const GET_PROJECTS = gql`
  query getProjectGroups {
    getProjectGroups {
      id
      name
      description
      memberCount
      owner {
        id
        username
      }
      members {
        username
      }
    }
  }
`;

const GET_PROJECT = gql`
  query getProjectGroup($projectGroupID: ID!) {
    getProjectGroup(projectGroupID: $projectGroupID) {
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

const CREATE_PROJECT = gql`
  mutation createProjectGroup($name: String!) {
    createProjectGroup(name: $name) {
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

export { GET_PROJECTS, GET_PROJECT, CREATE_PROJECT };