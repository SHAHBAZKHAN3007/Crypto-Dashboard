import actionTypes from "../action/types";

const initialState ={
    currency:'usd'
}

//this reducer use to select the value of currency which is  set the value in store and use in component
const selectCurrencyReducer = (state=initialState, action) =>{
    
    switch(action.type){
        case actionTypes.SELECT_CURRENCY_SUCCESS: 
        return {
            ...state,
            currency:action.payload
        }
        default: return state
    }
}

export default selectCurrencyReducer;