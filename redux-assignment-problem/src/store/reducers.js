import * as actionTypes from './actions';

const initialState = {
  persons: []
}

const reducer = ((state=initialState, action) => {
  console.log(state, action);
  switch (action.type) {
    case actionTypes.ADD_PERSON:
      return {
        ...state,
        persons: state.persons.concat(action.newPerson)
      };
    case actionTypes.DELETE_PERSON:
      return {
        ...state,
        persons: state.persons.filter(person => person.id !== action.id)
      };
    default:
      return state;
  }
});

export default reducer;