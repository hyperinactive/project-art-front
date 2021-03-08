import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react';

import { UserContext } from '../../../context/UserProvider';
import Post from '../../Post';
import PostForm from '../../PostForm';
import './Home.css';

import { GET_POSTS } from '../../../graphql';

const Home = () => {
  const { user } = useContext(UserContext);

  // useQuery hook sends the query
  // loading and data we get from the hook
  const { loading, data } = useQuery(GET_POSTS, {
    pollInterval: 10000,
  });

  // here, we're using the loading bool to tell us if the data is being fetched
  // if so we're gonna display the loading component
  // if not we're displaying the posts
  return (
    <div className="home">
      <Grid columns={3} divided>
        <Grid.Row className="home__grid-row">
          <h1 className="home__grid-title">Recent posts</h1>
        </Grid.Row>
        {user && (
          <Grid.Row>
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          </Grid.Row>
        )}
        <Grid.Row>
          {loading ? (
            <h1>Loading posts...</h1>
          ) : (
            <Transition.Group>
              {data &&
                data.getPosts.map((post) => (
                  <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                    <Post post={post} />
                  </Grid.Column>
                ))}
            </Transition.Group>
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default Home;
