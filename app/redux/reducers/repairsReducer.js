import { ADD_REPAIR } from "@constants";

const initialState = {
  friends: [1, 2, 3],
  friendsById: {
    1: {
      id: 1,
      name: "Theodore Roosevelt"
    },
    2: {
      id: 2,
      name: "Abraham Lincoln"
    },
    3: {
      id: 3,
      name: "George Washington"
    }
  }
};

export default function repairsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_REPAIR:
      const newId = state.friends[state.friends.length - 1] + 1;
      return {
        ...state,
        friends: state.friends.concat(newId),
        friendsById: {
          ...state.friendsById,
          [newId]: {
            id: newId,
            name: action.name
          }
        }
      };

    default:
      return state;
  }
}
