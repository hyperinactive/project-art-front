/* eslint-disable react/jsx-props-no-spreading */
import React, { createContext, useReducer } from 'react';
import { inboxReducer, initialState, actionTypes } from './inboxReducer';

export const InboxContext = createContext({
  ...initialState,
  setSelectedUser: () => {},
  setUsers: () => {},
});

export const InboxProvider = (props) => {
  const [state, dispatch] = useReducer(inboxReducer, initialState);

  const setSelectedUser = (data) => {
    dispatch({
      type: actionTypes.SET_SELECTED_USER,
      payload: data,
    });
  };

  const setUsers = (data) => {
    dispatch({
      type: actionTypes.SET_USERS,
      payload: data,
    });
  };

  return (
    <InboxContext.Provider
      value={{ selectedUser: state.selectedUser, setSelectedUser, setUsers }}
      {...props}
    />
  );
};
