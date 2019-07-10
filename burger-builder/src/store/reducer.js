import * as actionTypes from './actions';

const initialState = {
  ingredients: {},
  totalIngredients: 0
}

const reducer = (state = initialState, action) => {
  console.log(state, action);
  
  switch (action.type) {
    case actionTypes.INITIALIZE_INGREDIENTS: {
      const totalIngredients = Object.keys(action.ingredients)
        .map(key => action.ingredients[key] || 0)
        .reduce((total, value) => total + value, 0);
      
      return {
        ...state,
        ingredients: { ...action.ingredients },
        totalIngredients: totalIngredients
      };
    }
      
    case actionTypes.ADD_INGREDIENT: {
      const ingredientNameTotal = state.ingredients[action.ingredientName] || 0;
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName] : ingredientNameTotal + 1
        },
        totalIngredients: state.totalIngredients + 1
      };
    }
    
    case actionTypes.REMOVE_INGREDIENT: {
      const ingredientNameTotal = state.ingredients[action.ingredientName] || 0;
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.ingredientName] : Math.max(ingredientNameTotal - 1, 0)
        },
        totalIngredients: Math.max(state.totalIngredients - 1, 0)
      };
    }
    
    default: {
      return state;
    }
  }
}

export default reducer;