import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NavigationContext } from '../../context/NavigationProvider';

const NotFoundPage = () => {
  const { setActiveItem } = useContext(NavigationContext);

  return (
    <div>
      <p style={{ textAlign: 'center' }}>
        <h1>Uh oh, page not found</h1>
        <Link to="/" onClick={() => setActiveItem('home')}>
          Take me home (Country roads)
        </Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
