/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Grid } from 'semantic-ui-react';

import Post from './Post';

// create the query
const GET_POSTS_QUERY = gql`
  {
    getPosts {
      id
      body
      createdAt
      username
      likeCount
      commentCount
      likes {
        username
      }
      comments {
        username
      }
    }
  }
`;

const Home = () => {
  // useQuery hook sends the query
  // loading and data we get from the hook
  const { loading, data, error } = useQuery(GET_POSTS_QUERY);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  // here, we're using the loading bool to tell us if the data is being fetched
  // if so we're gonna display the loading component
  // if not we're displaying the posts
  return (
    <Grid columns={3} divided>
      <Grid.Row>
        <h1>Recent posts</h1>
      </Grid.Row>
      <Grid.Row>
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          data &&
          data.getPosts.map((post) => (
            <Grid.Column style={{ marginBottom: 20 }}>
              <Post key={post.id} post={post} />
            </Grid.Column>
          ))
          // <h1>Loaded</h1>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
