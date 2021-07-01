export const initialState = {
  selectedUser: null,
  friends: [],
};

export const actionTypes = {
  SET_SELECTED_USER: 'SET_SELECTED_USER',
  SET_USERS: 'SET_USERS',
  SET_MESSAGES: 'SET_MESSAGES',
};

export const inboxReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_SELECTED_USER:
      return {
        ...state,
        selectedUser: action.payload,
      };

    case actionTypes.SET_USERS: {
      const friendsIDs = [];
      Object.entries(action.payload).forEach((e) =>
        friendsIDs.push({
          friendID: e[1].id,
          messages: [],
        })
      );
      return {
        ...state,
        friends: friendsIDs,
      };
    }
    default:
      throw new Error(`Unknows action type: ${action.type}`);
  }
};
