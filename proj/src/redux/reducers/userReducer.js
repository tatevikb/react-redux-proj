const initialState = [
    { id: 0, name: "Manouk Manoukyan", email: "manouk@gmail.com", phone: 1234567890 },
    { id: 1, name: "Sargis Sargsyan", email: "sargis@gmail.com", phone: 1112223334 },
    { id: 2, name: "Simon Simonyan", email: "simon@gmail.com", phone: 2223334445 }
  ];
  
  export const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case "ADD_USER":
        state = [...state, action.payload];
        return state;
      case "DELETE_USER":
        const userFilter = state.filter((user) =>
          user.id === action.payload ? null : user
        );
        state = userFilter;
        return state;
      case "UPDATE_USER":
        const userUpdate = state.filter((user) =>
          user.id === action.payload.id
            ? Object.assign(user, action.payload)
            : user
        );
        state = userUpdate;
        return state;
      case "RESET_USER":
        state = [{ name: null, email: null, phone: null }];
        return state;
      default:
        return state;
    }
  };