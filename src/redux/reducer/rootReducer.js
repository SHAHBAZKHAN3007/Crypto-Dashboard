import { combineReducers } from "redux";
import defaultReducer from "./defaultReducer";
import exchangeReducer from "./exchangeReducer";
import searchCoinReducer from "./searchCoinReducer";
import selectCoinReducer from "./selectCoinReducer";
import selectCurrencyReducer from "./selectCurrencyReducer";

//main reducer of the App
const rootReducer = combineReducers ({
    default:defaultReducer,
    exchange:exchangeReducer,
    selectCoin:selectCoinReducer,
    selectCurrency:selectCurrencyReducer,
    searchCoin:searchCoinReducer
})


export default rootReducer