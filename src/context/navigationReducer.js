export const initialState = {
  activeItem: '/',
};

export const actionTypes = {
  SET_ACTIVE_ITEM: 'SET_ACTIVE_ITEM',
};

export const navigationReducer = (state, action) => {
  if (action.type === actionTypes.SET_ACTIVE_ITEM) {
    return {
      ...state,
      activeItem: action.payload,
    };
  }
  return state;
};
