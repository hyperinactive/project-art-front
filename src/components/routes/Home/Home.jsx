import React, { useContext } from 'react';
import { UserContext } from '../../../context/UserProvider';
import UserWorkspace from './UserWorkspace';
import Welcome from './Welcome';
import './Home.css';

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="home" style={{ marginTop: 50 }}>
      {user ? <UserWorkspace /> : <Welcome />}
    </div>
  );
};

export default Home;
