export const initialState = {
  user: null,
};

export const actionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

// this reducer will take care of user sessions
export const userReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOGIN:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.LOGOUT: {
      return {
        ...state,
        user: null,
      };
    }
    default:
      return state;
  }
};
