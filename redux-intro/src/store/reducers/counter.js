import * as actionTypes from '../actions';

const initialState = {
  counter: 0,
  total: 0
}

const reducer = (state = initialState, action) => {
  console.log(state, action);
  switch (action.type) {
    case actionTypes.INCREMENT:
      return {
        ...state,
        counter: state.counter + 1,
        total: state.total + 1
      };
    case actionTypes.DECREMENT:
      return {
        ...state,
        counter: state.counter - 1,
        total: state.total + 1
      };
    case actionTypes.ADD_VALUE:
      return {
        ...state,
        counter: state.counter + action.value,
        total: state.total + 1
      };
    case actionTypes.SUBTRACT_VALUE:
      return {
        ...state,
        counter: state.counter - action.value,
        total: state.total + 1
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