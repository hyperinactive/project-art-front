/* eslint-disable react/jsx-props-no-spreading */
import React, { createContext, useReducer } from 'react';
import { inboxReducer, initialState, actionTypes } from './inboxReducer';

export const InboxContext = createContext({
  ...initialState,
  setSelectedUser: () => {},
  setCursor: () => {},
});

export const InboxProvider = (props) => {
  const [state, dispatch] = useReducer(inboxReducer, initialState);

  const setSelectedUser = (data) => {
    dispatch({
      type: actionTypes.SET_SELECTED_USER,
      payload: data,
    });
  };

  const setCursor = (data) => {
    dispatch({
      type: actionTypes.SET_CURSOR,
      payload: data,
    });
  };

  return (
    <InboxContext.Provider
      value={{
        selectedUser: state.selectedUser,
        setSelectedUser,
        cursor: state.cursor,
        setUsers: setCursor,
      }}
      {...props}
    />
  );
};
