import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <div>
    <p style={{ textAlign: 'center' }}>
      <h1>Uh oh, page not found</h1>
      <Link to="/">Take me home (Country roads)</Link>
    </p>
  </div>
);

export default NotFoundPage;
