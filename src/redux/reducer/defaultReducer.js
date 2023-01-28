import actionTypes from "../action/types";

const initialState ={
    projectName:"Crypto dashboard",
    coinList: []
}

//this reducer use to MarketCap componet to set value in store
const defaultReducer = (state=initialState, action) =>{
    
    switch(action.type){


        case actionTypes.COIN_API_SUCCESS:
            return {
                ...state,
                coinList : action.payload

            }

        case actionTypes.COIN_API_ERROR:
            alert(action.payload)
            return state

        default: return state
    }
}

export default defaultReducer;