/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { createContext, useContext, useReducer } from 'react';

import { initialState, userReducer, actionTypes } from './userReducer';

// Creates a Context object. When React renders a component that subscribes to this Context object
// it will read the current context value from the closest matching Provider above it in the tree.
// The defaultValue argument is only used when a component does not have a matching Provider above it in the tree.
// This default value can be helpful for testing components in isolation without wrapping them.
// Note: passing undefined as a Provider value does not cause consuming components to use defaultValue.

// note: initial state just has a field of user, nothing else...

// this context creates a nul user and functions that don't do shit
export const UserContext = createContext({
  ...initialState,
  login: (data) => {},
  logout: () => {},
});

// creating a provider
export const UserProvider = (props) => {
  // useReducer is the same as useState LUL
  const [state, dispatch] = useReducer(userReducer, { user: null });

  const login = (data) => {
    dispatch({
      type: actionTypes.LOGIN,
      payload: data,
    });
  };

  const logout = () => {
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
