
export const queryReducer = (state={text:''}, action)=>{
  switch (action.type) {
    case "QUERY":
      return ({ ...state,...action.payloads});
    default:
      return state
  }
}