import { gql } from '@apollo/client';

const GET_POST = gql`
  query getPost($postID: ID!) {
    getPost(postID: $postID) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        username
        body
        createdAt
      }
      commentCount
    }
  }
`;

const GET_POSTS = gql`
  query {
    getPosts {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        username
        body
        createdAt
      }
      commentCount
    }
  }
`;

const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        username
        body
        createdAt
      }
      commentCount
    }
  }
`;

// no need for returning values
const DELETE_POST = gql`
  mutation deletePost($postID: ID!) {
    deletePost(postID: $postID) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

// NOTE: don't forget to first declare $variables before calling the mutation
// because of id being passed to us we can tell which post is mutated
// apollo cache is smart enough to cache it immediately and I don't have to do it manually
const LIKE_POST = gql`
  mutation likeTogglePost($postID: ID!) {
    likeTogglePost(postID: $postID) {
      id
      likes {
        id
        username
        createdAt
      }
      likeCount
    }
  }
`;

const GET_POSTS_CHUNK = gql`
  query getPostsChunk($skip: Int, $limit: Int!) {
    getPostsChunk(skip: $skip, limit: $limit) {
      posts {
        id
        body
        createdAt
        username
        likes {
          id
          username
          createdAt
        }
        likeCount
        comments {
          id
          username
          body
          createdAt
        }
        commentCount
      }
      hasMoreItems
    }
  }
`;

// TODO: to be the default way of creating posts
// TODO: maybe don't just send a post type but also the project, at least id
const CREATE_PROJECT_POST = gql`
  mutation createProjectPost($projectID: ID!, $body: String!) {
    createProjectPost(projectID: $projectID, body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        username
        body
        createdAt
      }
      commentCount
    }
  }
`;

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`;

export {
  GET_POST,
  GET_POSTS,
  CREATE_POST,
  DELETE_POST,
  LIKE_POST,
  GET_POSTS_CHUNK,
  CREATE_PROJECT_POST,
  UPLOAD_FILE,
};
