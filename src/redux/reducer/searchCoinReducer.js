import actionTypes from "../action/types";

const initialState ={
    search:''
}
//this reducer use to select the value of currency which is  set the value in store and use in component
const searchCoinReducer = (state=initialState, action) =>{
    
    switch(action.type){
        case actionTypes.SEARCH_COIN_SUCCESS: 
        return {
            // ...state,
            search:action.payload
        }
        default: return state
    }
}

export default searchCoinReducer;