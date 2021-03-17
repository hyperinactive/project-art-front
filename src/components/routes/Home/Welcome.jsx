import React from 'react';
import { Link } from 'react-router-dom';
import { Image, Button } from 'semantic-ui-react';

const Welcome = () => (
  <div
    className="welcome"
    style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
  >
    <h2>
      Welcome to project-
      <i style={{ color: 'brown' }}>art</i>!
    </h2>
    <Image
      size="small"
      as="div"
      src={`${process.env.PUBLIC_URL}/hello.gif`}
      style={{ margin: 60 }}
    />
    <Button
      as={Link}
      to="/login"
      size="large"
      color="orange"
      animated="fade"
      tabIndex="0"
    >
      <div className="visible content">Join?</div>
      <div className="hidden content">Join!</div>
    </Button>
  </div>
);

export default Welcome;
