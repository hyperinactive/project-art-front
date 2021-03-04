/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/forbid-prop-types */
import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { UserContext } from '../context/UserProvider';

const UserRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(UserContext);

  // our custom Route component
  // if user is not logged render the Component provided and pass any props if there are any
  // else just redirect via Redirect component
  return (
    <Route
      {...rest}
      render={(props) =>
        user ? <Redirect to="/" /> : <Component {...props} />
      }
    />
  );
};

UserRoute.defaultProps = {
  component: () => {},
  props: [],
};

UserRoute.propTypes = {
  component: PropTypes.func,
  props: PropTypes.array,
};

export default UserRoute;
