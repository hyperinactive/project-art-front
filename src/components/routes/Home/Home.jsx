import React, { useContext } from 'react';
import { UserContext } from '../../../context/UserProvider';
import UserWorkspace from './UserWorkspace';
import Welcome from './Welcome';
import './Home.scss';

const Home = () => {
  const { user } = useContext(UserContext);

  return <div className="home">{user ? <UserWorkspace /> : <Welcome />}</div>;
};

export default Home;
