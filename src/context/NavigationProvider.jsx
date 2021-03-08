/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React, { createContext, useReducer } from 'react';
import {
  navigationReducer,
  actionTypes,
  initialState,
} from './navigationReducer';

export const NavigationContext = createContext({
  ...initialState,
  setActiveItem: (data) => {},
});

export const NavigationProvider = (props) => {
  const [state, dispatch] = useReducer(navigationReducer, initialState);

  const setActiveItem = (data) => {
    dispatch({
      type: actionTypes.SET_ACTIVE_ITEM,
      payload: data,
    });
  };

  return (
    <NavigationContext.Provider
      value={{ activeItem: state.activeItem, setActiveItem }}
      {...props}
    />
  );
};
