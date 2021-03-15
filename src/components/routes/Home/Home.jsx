import React, { useContext } from 'react';
import { Grid } from 'semantic-ui-react';

import { UserContext } from '../../../context/UserProvider';
import './Home.css';

const Home = () => {
  const { user } = useContext(UserContext);

  // here, we're using the loading bool to tell us if the data is being fetched
  // if so we're gonna display the loading component
  // if not we're displaying the posts
  return (
    <div className="home" style={{ marginTop: 50 }}>
      <Grid centered columns={3} divided>
        {user ? (
          <h2>Welcome {user.username}</h2>
        ) : (
          <h2>Welcome to project-art!</h2>
        )}
      </Grid>
    </div>
  );
};

export default Home;
