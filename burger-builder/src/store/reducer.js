import * as actionTypes from './actions';

const PRICE = 4;
const initialState = {
  ingredients: {},
  prices: {},
  totalIngredients: 0,
  totalPrice: 0
}

const reducer = (state = initialState, action) => {
  console.log(state, action);
  
  switch (action.type) {
    case actionTypes.INITIALIZE_INGREDIENT_INFO: {
      const ingredients = { ...initialState.ingredients };
      const prices = { ...initialState.prices };
      let totalIngredients = 0;
      let totalPrice = PRICE;
      
      for (let key in action.ingredientInfo) {
        ingredients[key] = action.ingredientInfo[key]['qty'];
        prices[key] = action.ingredientInfo[key]['price'];
        totalIngredients += ingredients[key];
        totalPrice += (ingredients[key] * prices[key]);
      }
      
      return {
        ...state,
        ingredients: { ...ingredients },
        prices: { ...prices },
        totalIngredients: totalIngredients,
        totalPrice: totalPrice
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
        totalIngredients: state.totalIngredients + 1,
        totalPrice: state.totalPrice + state.prices[action.ingredientName]
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
        totalIngredients: Math.max(state.totalIngredients - 1, 0),
        totalPrice: Math.max(state.totalPrice - state.prices[action.ingredientName], PRICE)
      };
    }
    
    default: {
      return state;
    }
  }
}

export default reducer;