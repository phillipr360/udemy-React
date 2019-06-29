import * as actionTypes from '../actions';

const initialState = {
  results: []
}

const reducer = (state = initialState, action) => {
  console.log(state, action);
  switch (action.type) {
    case actionTypes.STORE_RESULT:
      const appended = [...state.results];
      appended.push({
        counter: state.counter,
        total: state.total}
      );
      return {
        ...state,
        results: state.results.concat(action.result)
      };
    case actionTypes.DELETE_RESULT:
      // const deleted = [...state.results];
      // deleted.splice(action.index, 1);
      return {
        ...state,
        results: state.results.filter((result, index) => index !== action.index)
      };
    case actionTypes.RESET:
      return {
        ...initialState
      };
    default:
      return state;
  }
}

export default reducer;