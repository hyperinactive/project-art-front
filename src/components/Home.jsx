/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Grid } from 'semantic-ui-react';

import Post from './Post';
import './Home.css';
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
        body
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
    <div className="home">
      <Grid columns={3} divided>
        <Grid.Row className="home__grid-row">
          <h1 className="home__grid-title">Recent posts</h1>
        </Grid.Row>
        <Grid.Row>
          {loading ? (
            <h1>Loading posts...</h1>
          ) : (
            data &&
            data.getPosts.map((post) => (
              <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                <Post post={post} />
              </Grid.Column>
            ))
            // <h1>Loaded</h1>
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Home;
