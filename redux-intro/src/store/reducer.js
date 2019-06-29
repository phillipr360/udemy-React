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
    case 'STORE_RESULT':
      const appended = [...state.results];
      appended.push({
        counter: state.counter,
        total: state.total}
      );
      return {
        ...state,
        results: state.results.concat({
          counter: state.counter,
          total: state.total
        })
      };
    case 'DELETE_RESULT':
      // const deleted = [...state.results];
      // deleted.splice(action.index, 1);
      return {
        ...state,
        results: state.results.filter((result, index) => index !== action.index)
      };
    case 'RESET':
      return {
        ...initialState
      };
    default:
      return state;
  }
}

export default reducer;