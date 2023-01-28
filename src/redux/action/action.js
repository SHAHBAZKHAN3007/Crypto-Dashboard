import axios from "axios"
import actionTypes from "./types"

// fetchCoins use to fetch the data of all crypto currency for MarketCapList
export const fetchCoins = (currency) => {
      return (dispatch) => {
          axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&page=1&per_page=250`)
          .then(response =>{
              const data = response.data
              console.log('api testing' , currency, data)
              dispatch({
                type: actionTypes.COIN_API_SUCCESS,
                payload: data
              })
          })
          .catch(error =>{
              const errorMsg = error.message
              dispatch({
                type: actionTypes.COIN_API_ERROR,
                payload : errorMsg
              })
          })
      }
  }

// fetchCoins function use to fetch the currency value for ExchnageCoin Component
  export const fechCoinList = () => {
    return (dispatch) => {
        axios.get('https://api.coingecko.com/api/v3/exchange_rates')
        .then(response =>{
            const data = response.data
            dispatch({
              type: actionTypes.EXCHANGE_SUCCESS,
              payload: data
            })
        })
        .catch(error =>{
            const errorMsg = error.message
            dispatch({
              type: actionTypes.EXCHANGE_ERROR,
              payload : errorMsg
            })
        })
    }
}

//SelectfechCoin function use to fetch all currency which is use in CryptoChart component for slection of currency by user
export const SelectfechCoin = () => {
  return (dispatch) => {
      axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
      .then(response =>{
          const data = response.data
          dispatch({
            type: actionTypes.SELECT_SUCCESS,
            payload: data
          })
      })
      .catch(error =>{
          const errorMsg = error.message
          dispatch({
            type: actionTypes.SELECT_ERROR,
            payload : errorMsg
          })
      })
  }
}

export const selectCurrency = (dispatch, currency="usd")=>{
  return dispatch({
    type:actionTypes.SELECT_CURRENCY_SUCCESS,
    payload:currency
  })
}

export const searchCurrency = (dispatch, search)=>{
  return dispatch({
    type:actionTypes.SEARCH_COIN_SUCCESS,
    payload:search
  })
}
