import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchCurrency, selectCurrency } from '../redux/action/action'


//SearchBar component shows search currency which is shows in MarketCapList component, select type of currecny.
export const SearchBar = () => {

    const dispatch = useDispatch();
    const currency = useSelector((state) => state.selectCurrency);
    const search = useSelector((state) => state.searchCoin);
    return (
        <>
            <div className="h-25 ">
                <div className="flex gap-4">
                    <div className="">

                        <select value={currency.currency} onChange={(e) => selectCurrency(dispatch, e.target.value)}
                            className="px-2 py-2 bg-white rounded ">
                            <option value={`usd`}>USD</option>
                            <option value={`inr`}>INR</option>
                            <option value={`eur`}>EUR</option>
                            <option value={`jpy`}>JPY</option>
                        </select>
                    </div>
                    <div className="grow">
                        <div className="relative flex items-center w-full py-2 rounded bg-white overflow-hidden">
                            <div className="grid place-items-center h-full w-12 text-gray-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="3"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>

                            <input
                                className="peer h-full w-full outline-none text-sm text-gray-700 pr-2"
                                type="text"
                                id="search"
                                placeholder="Search by coin"
                                value={search.search}
                                onChange={(e) => searchCurrency(dispatch, e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
