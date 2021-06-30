export const initialState = {
  selectedUser: null,
};

export const actionTypes = {
  SET_SELECTED_USER: 'SET_SELECTED_USER',
};

export const inboxReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };

    default:
      throw new Error(`Unknows action type: ${action.type}`);
  }
};
