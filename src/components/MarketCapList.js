import React from "react";
import { useSelector } from "react-redux";
import { Marketcap } from "./MarketCap";

//MarketCaplist component  list the market cap item
export const MarketCapList = () => {

  const myData = useSelector((state) => state.default);
  const search = useSelector((state) => state.searchCoin);
  const currencyData = useSelector((state) => state.selectCurrency);
  const currency = currencyData.currency || "usd";
  
  return (
    <>
      <div className="border text-start py-4 px-4 font-body bg-white rounded-lg shadow-lg">
        <h1 className="font-semibold lg:text-sm md:text-sm sm:text-lg sm:text-center"> Cryptocurrency by Market cap in {currency.toUpperCase()}</h1>
        <ul className="py-2">
          <li className="overflow-scroll overflow-x-hidden" style={{height:511}}>
            {
              myData.coinList.filter((val)=>{
                if (search.search=="") {
                  return val;
                } else if(val.name.toLowerCase().includes(search.search.toLowerCase())){
                  return val;
                }
              }).map((val , i) => {
                return (<Marketcap key={i} item={val} />)
              })
            }
          </li>
        </ul>
      </div>
    </>
  );
};
