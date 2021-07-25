/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { UserContext } from '../../context/userContext/UserProvider';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          user.emailVerified ? (
            <Component {...props} />
          ) : (
            <Redirect to={`/verify/${user.id}`} />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

ProtectedRoute.defaultProps = {
  component: <></>,
  props: [],
};

ProtectedRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.node,
    PropTypes.element,
  ]),
  props: PropTypes.arrayOf(PropTypes.any),
};

export default ProtectedRoute;
