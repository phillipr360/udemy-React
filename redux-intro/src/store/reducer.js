const initialState = {
  counter: 0,
  total: 0
}

const reducer = (state = initialState, action) => {
  if (action.type === 'INCREMENT') {
    return {
      ...state,
      counter: state.counter + 1,
      total: state.total + 1
    };
  }
  if (action.type === 'DECREMENT') {
    return {
      ...state,
      counter: state.counter - 1,
      total: state.total + 1
    };
  }
  if (action.type === 'ADD_VALUE') {
    return {
      ...state,
      counter: state.counter + action.value,
      total: state.total + 1
    };
  }
  if (action.type === 'SUBTRACT_VALUE') {
    return {
      ...state,
      counter: state.counter - action.value,
      total: state.total + 1
    };
  }
  return state;
}

export default reducer;