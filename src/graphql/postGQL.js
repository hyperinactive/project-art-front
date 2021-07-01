import { gql } from '@apollo/client';
import {
  COMMENT_FIELDS,
  LIKE_FIELDS,
  POST_FIELDS,
  USER_FIELDS,
} from './fragments';

const GET_POST = gql`
  ${USER_FIELDS}
  ${POST_FIELDS}
  ${LIKE_FIELDS}
  ${COMMENT_FIELDS}
  query getPost($postID: ID!) {
    getPost(postID: $postID) {
      ...PostFields
      ...LikeFields
      user {
        ...UserFields
      }
      ...CommentFields
      commentCount
      project {
        id
        members {
          id
        }
      }
    }
  }
`;

const GET_POSTS = gql`
  ${POST_FIELDS}
  ${LIKE_FIELDS}
  ${COMMENT_FIELDS}
  query getPosts {
    getPosts {
      ...PostFields
      ...LikeFields
      ...CommentFields
      commentCount
    }
  }
`;

const CREATE_POST = gql`
  ${POST_FIELDS}
  ${LIKE_FIELDS}
  ${COMMENT_FIELDS}
  mutation createPost($body: String!) {
    createPost(body: $body) {
      ...PostFields
      ...LikeFields
      comments {
        ...CommentFields
      }
      commentCount
    }
  }
`;

const DELETE_POST = gql`
  ${POST_FIELDS}
  ${LIKE_FIELDS}
  ${COMMENT_FIELDS}
  mutation deletePost($postID: ID!) {
    deletePost(postID: $postID) {
      ...PostFields
      ...LikeFields
      comments {
        ...CommentFields
      }
      commentCount
    }
  }
`;

const LIKE_POST = gql`
  ${LIKE_FIELDS}
  mutation likeTogglePost($postID: ID!) {
    likeTogglePost(postID: $postID) {
      id
      ...LikeFields
    }
  }
`;

const GET_POSTS_CHUNK = gql`
  ${POST_FIELDS}
  ${LIKE_FIELDS}
  ${COMMENT_FIELDS}
  query getPostsChunk($skip: Int, $limit: Int!) {
    getPostsChunk(skip: $skip, limit: $limit) {
      posts {
        ...PostFields
        ...LikeFields
        comments {
          ...CommentFields
        }
        commentCount
      }
      hasMoreItems
    }
  }
`;

const CREATE_PROJECT_POST = gql`
  ${POST_FIELDS}
  ${LIKE_FIELDS}
  ${COMMENT_FIELDS}
  mutation createProjectPost($projectID: ID!, $body: String!, $image: Upload) {
    createProjectPost(projectID: $projectID, body: $body, image: $image) {
      ...PostFields
      ...LikeFields
      comments {
        ...CommentFields
      }
      commentCount
      imageURL
    }
  }
`;

const UPLOAD_FILE = gql`
  mutation uploadFile($file: Upload!) {
    uploadFile(file: $file) {
      url
    }
  }
`;

const GET_PROJECT_POSTS = gql`
  ${POST_FIELDS}
  ${LIKE_FIELDS}
  ${USER_FIELDS}
  query getProjectPosts($projectID: ID!) {
    getProjectPosts(projectID: $projectID) {
      ...PostFields
      ...LikeFields
      commentCount
      imageURL
      user {
        ...UserFields
      }
    }
  }
`;

const GET_POSTS_FEED = gql`
  ${POST_FIELDS}
  ${LIKE_FIELDS}
  ${USER_FIELDS}
  query getPostsFeed($projectID: ID!, $cursor: ID, $skip: Int) {
    getPostsFeed(projectID: $projectID, cursor: $cursor, skip: $skip) {
      posts {
        ...PostFields
        ...LikeFields
        commentCount
        imageURL
        user {
          ...UserFields
        }
      }
      nextCursor
      hasMoreItems
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
  GET_PROJECT_POSTS,
  GET_POSTS_FEED,
};
