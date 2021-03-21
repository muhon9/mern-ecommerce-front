

export const userReducer = (state= null, action) => {
  switch (action.type) {
    case "LOGGED_IN_USER":
      return action.payloads;

    case "LOGGED_OUT":
      return action.payloads;
    default:
      return state;
  }
}
 
