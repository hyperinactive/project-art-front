import { gql } from '@apollo/client';

const GET_PROJECTS = gql`
  query getProjectGroups {
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
`;

const GET_PROJECT = gql`
  query getProjectsGroup($projectID: ID!) {
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
