import React from "react";

//MarketCap component shows market cap detail for particular currency
export const Marketcap = ({ item }) => {
  return (
    <div className="border-b">
      <div className="flex flex-row px-2 my-4 justify-center items-center">
        <img src={item.image} alt="Logo" style={{ height: 35 }} />
        <div className="grow">
          <p className="text-sm">{item.name}</p>
          <p className="text-xs text-gray-400">Marketcap {item.market_cap}</p>
        </div>
        <div className={`text-xs ${item.market_cap_change_percentage_24h > 0 ? 'text-green-700 ' : 'text-red-700 '}`}>
          <span className="m-1">
            <i className={`${item.market_cap_change_percentage_24h > 0 ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down'}`}></i>
          </span>
          <span>
            {parseFloat(item.market_cap_change_percentage_24h).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
};
