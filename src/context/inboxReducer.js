export const initialState = {
  selectedUser: null,
  cursor: null,
};

export const actionTypes = {
  SET_SELECTED_USER: 'SET_SELECTED_USER',
  SET_CURSOR: 'SET_CURSOR',
};

export const inboxReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };

    case actionTypes.SET_CURSOR:
      return {
        ...state,
        cursor: action.payload,
      };

    default:
      throw new Error(`Unknows action type: ${action.type}`);
  }
};
