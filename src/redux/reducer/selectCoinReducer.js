import actionTypes from "../action/types";

const initialState ={
    projectName:"Crypto Exchange",
    coinList: [],
}

//this reducer use to select the value of currency which is  set the value in store and use in component
const selectCoinReducer = (state=initialState, action) => {
    
    switch(action.type){


        case actionTypes.SELECT_SUCCESS:
            return {
                ...state,
                coinList : action.payload
            }

        case actionTypes.SELECT_ERROR:
            alert(action.payload)
            return state

        default: return state
    }
}

export default selectCoinReducer;