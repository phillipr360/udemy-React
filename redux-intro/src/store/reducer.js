const initialState = {
  counter: 0,
  total: 0,
  results: []
}

const reducer = (state = initialState, action) => {
  console.log(state, action);
  switch (action.type) {
    case 'INCREMENT':
      return {
        ...state,
        counter: state.counter + 1,
        total: state.total + 1
      };
    case 'DECREMENT':
      return {
        ...state,
        counter: state.counter - 1,
        total: state.total + 1
      };
    case 'ADD_VALUE':
      return {
        ...state,
        counter: state.counter + action.value,
        total: state.total + 1
      };
    case 'SUBTRACT_VALUE':
      return {
        ...state,
        counter: state.counter - action.value,
        total: state.total + 1
      };
    case 'RESET':
      return {
        ...state,
        counter: 0,
        total: 0
      };
    default:
      return state;
  }
}

export default reducer;