export const initialState = {
  activeItem: '/',
  temporaryTab: null,
};

export const actionTypes = {
  SET_ACTIVE_ITEM: 'SET_ACTIVE_ITEM',
  SET_TEMPORARY_TAB: 'SET_TEMPORARY_TAB',
};

export const navigationReducer = (state, action) => {
  // set active menu item
  switch (action.type) {
    case actionTypes.SET_ACTIVE_ITEM:
      return {
        ...state,
        activeItem: action.payload,
      };
    case actionTypes.SET_TEMPORARY_TAB:
      return {
        ...state,
        temporaryTab: action.payload,
      };

    default:
      throw new Error(`Unknows action type: ${action.type}`);
  }
};
