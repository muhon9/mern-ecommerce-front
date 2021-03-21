export const drawerReducer = (state= false, action) => {
  switch (action.type) {
    case "SET_VISIBLE":
      return state=action.payloads;
    default:
      return state;
  }
}