/* eslint-disable react/jsx-props-no-spreading */
import React, { createContext, useReducer } from 'react';
import { useApolloClient } from '@apollo/client';
import jwtDecode from 'jwt-decode';

import { initialState, userReducer, actionTypes } from './userReducer';

const checkTokenExpiration = (dispatch) => {
  if (localStorage.getItem('userToken')) {
    const decodedToken = jwtDecode(localStorage.getItem('userToken'));

    // TODO:
    // if the expiration is within the 5 minutes, regenerate the token
    // if (
    //   decodedToken.exp * 1000 - new Date(Date.now() + 5 * 60 * 1000) <
    //   60 * 5 * 1000
    // ) {
    //   // regen the token
    // }

    if (decodedToken.exp * 1000 < Date.now()) {
      // localStorage.removeItem('userToken');
      // initialState.user = null;
      localStorage.removeItem('userToken');
      dispatch({ type: actionTypes.LOGOUT });
    } else {
      initialState.user = decodedToken;
    }
  }
};

// Creates a Context object. When React renders a component that subscribes to this Context object
// it will read the current context value from the closest matching Provider above it in the tree.
// The defaultValue argument is only used when a component
// does not have a matching Provider above it in the tree.
// This default value can be helpful for testing components in isolation without wrapping them.
// Note:
// passing undefined as a Provider value does not cause consuming components to use defaultValue.

// note: initial state just has a field of user, nothing else...
// this context creates a nul user and functions that don't do shit
export const UserContext = createContext({
  ...initialState,
  login: () => {},
  logout: () => {},
});

// creating a provider
export const UserProvider = (props) => {
  // useReducer is the same as useState LUL
  const [state, dispatch] = useReducer(userReducer, initialState);
  const client = useApolloClient();

  checkTokenExpiration(dispatch);

  const login = (data) => {
    // to have data persist after a page reload we'll use the localStorage
    // to store the tokens of the logged users
    // we're making a field called ueserToken and setting the user.token to it
    localStorage.setItem('userToken', data.token);
    dispatch({
      type: actionTypes.LOGIN,
      payload: jwtDecode(data.token),
    });
  };

  const logout = () => {
    // upon logout remove the token
    localStorage.removeItem('userToken');
    // clear the cache of prev user data
    client.clearStore();
    client.cache.reset();
    dispatch({ type: actionTypes.LOGOUT });
  };

  // return the UserContext.Provider component
  // set the value of the user and the dispatch actions <- just an object {} containint these
  // pass down any props recieved in the components above it if needed
  return (
    <UserContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
};
