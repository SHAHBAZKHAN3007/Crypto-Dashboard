import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoins } from "../redux/action/action";
import { CryptoChart } from "./CryptoChart";
import { ExchangeCoins } from "./ExchangeCoins";
import { MarketCapList } from "./MarketCapList";
import Portfolio from "./Portfolio";
import { SearchBar } from "./SearchBar";

// Dashboard is main component;
function Dashboard() {
  const dispatch = useDispatch();
  const currencyData = useSelector((state) => state.selectCurrency);
  const currency = currencyData.currency || "usd";


  useEffect(() => {
    dispatch(fetchCoins(currency));
  }, [currency,dispatch]);

  return (
    <div className=" bg-[#FFD4D4]">
      <div className="py-2 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
          <div className="md:col-span-3 container-fluid">
            <SearchBar />
            <CryptoChart />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <Portfolio />
              <ExchangeCoins />
            </div>
          </div>
          <MarketCapList />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
