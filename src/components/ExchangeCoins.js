import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fechCoinList } from "../redux/action/action";

//ExchangeCoins use to covert the currency value in selected currency which is select by user
export const ExchangeCoins = () => {
    const dispatch = useDispatch();
    const exchangeData = useSelector((state) => state.exchange);
    const [text1, settext1] = useState("");
    const [text2, settext2] = useState(1);
    const [units, setUnits] = useState([]);
    const [value1, setvalue1] = useState(1);
    const [value2, setvalue2] = useState(1);
    const coin = exchangeData.coinList.rates;

    useEffect(() => {
        if (exchangeData.coinList.length === 0) {
            dispatch(fechCoinList());
        }
    }, []);
    
    // convert function convert currency in value which is selected my user
    const convert = () => {
        const unit = Object.values(coin).find((unit) => {
            return unit.value == value2
        })
        setUnits(unit.unit)
        let result = (value2 / value1) * text1;
        settext2(result);
    };

    return (
        <div className="px-2 py-2 bg-white rounded-lg border border-gray-200 shadow dark:bg-gray-800 dark:border-gray-700">
            <h4 className="text-md">ExchangeCoins</h4>
            <div className="flex flex-row">
                <div className="pr-4">
                    <div className="flex my-2 content-center items-center py-1 px-2">
                        <p className="text-red-400 mr-3 text-xs">Sell</p>
                        <select
                            onChange={(e) => setvalue1(e.target.value)}
                            className="lg:text-transform: capitalize inline-flex w-28 justify-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                        >
                            {coin && Object.values(coin).map((d, k) => (
                                <option key={k} value={d.value}>
                                    {d.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex my-2 content-center items-center py-1 px-2">
                        <p className="text-green-400 mr-3 text-xs">Buy</p>
                        <select
                            onChange={(e) => setvalue2(e.target.value)}
                            className="text-transform: capitalize inline-flex w-28 justify-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                        >
                            {coin && Object.values(coin).map((d, k) => (
                                <option key={k} value={d.value}>
                                    {d.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="-mt-2">
                    <div>
                        <div>
                        <label className="text-xs text-gray-500">
                            Enter value
                        </label>
                        </div>
                        <input
                            type="email"
                            name="email"
                            className="w-28 md:rounded border border-gray-200 px-3 py-1 text-sm"
                            placeholder="Enter value"
                            value={text1 || ""}
                            onChange={(e) => settext1(e.target.value)}
                        />
                        <p className="mt-6 text-green-600 text-xs text-transform: capitalize">{text2}{units}</p>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <button onClick={() => convert()} className="bg-blue-500 rounded text-sm py-2 px-3 text-white hover:bg-blue-600">
                    Exchange
                </button>
            </div>
        </div>
    );
};
