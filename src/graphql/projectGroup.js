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
  query getProjectGroup($projectID: ID!) {
    getProjectGroups(projectID: $projectID) {
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

export { GET_PROJECTS, GET_PROJECT };
