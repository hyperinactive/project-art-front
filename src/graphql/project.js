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
      members {
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
      members {
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

export { GET_PROJECTS, GET_PROJECT, CREATE_PROJECT };
