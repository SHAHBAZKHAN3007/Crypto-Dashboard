import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import { chartDays } from "./data";
import { useDispatch, useSelector } from "react-redux";
import { SelectfechCoin } from "../redux/action/action";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import MultiSelect from "../common/MultiSelect";
import Loader from "../common/Loader";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const chartColors = [
  {
    borderColor: "#13005A",
    backgroundColor: "#13005A",
  },
  {
    borderColor: "rgb(255, 70, 70)",
    backgroundColor: "rgba(255, 20,20, 0.5)",
  },
  {
    borderColor: "rgb(70, 255, 70)",
    backgroundColor: "rgba(20, 255, 20, 0.5)",
  },
];
// CyptoChart component show line chart,vertical cart, horizontal chart
export const CryptoChart = () => {
  const [days, setDays] = useState("30");
  const [loader, setLoader] = useState(false);
  const [chartValue, setChartValue] = useState("LineChart");
  const [selectedCurrencies, setSelectedCurrencies] = useState({});

  const stateData = useSelector((state) => {
    return {
      selectCoin: state.selectCoin.coinList,
      currency: state.selectCurrency.currency,
    };
  });

  const selectCoin = stateData.selectCoin;
  const currencyOptions = selectCoin ? Object.values(selectCoin) : [];
  const currency = stateData.currency;
  const dispatch = useDispatch();
  //onItemClick function to get selected currency on change
  async function onItemClick(item) {
    if (Object.keys(selectedCurrencies).includes(item)) {
      const stateCopy = {
        ...selectedCurrencies,
      };

      delete stateCopy[item];

      setSelectedCurrencies(stateCopy);
      return;
    }

    if (Object.keys(selectedCurrencies).length == 3) {
      return;
    }
    setLoader(true);
    const prices = await marketChartApi(item);
    setSelectedCurrencies({
      ...selectedCurrencies,
      [item] : prices
    })
    setLoader(false)
  }
 //marketChartApi fucntion  fetch a data from Api and change the value if change the state like item,currency,days
  async function marketChartApi(item) {
    try {
         
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${item}/market_chart?vs_currency=${currency}&days=${days}&interval=daily`
      )

      const data = await res.json()
      return data.prices

    } catch (error) {
      return null
    }
  }

 //reloadApis function store the date of api in object form
  async function reloadApis() {
    const newState = {}

    setLoader(true)

    for (let i = 0; i < Object.keys(selectedCurrencies).length; i++) {
      const item = Object.keys(selectedCurrencies)[i];
      const prices = await marketChartApi(item)
      if (prices) {
        newState[item] = prices
      }      
    }

    setSelectedCurrencies(newState)
    setLoader(false)
  }

  useEffect(() => {
    reloadApis()
  }, [days, currency]);

  useEffect(() => {
    if (selectCoin.length === 0) {
      dispatch(SelectfechCoin());
    }
  }, []);

  useEffect(() => {
    onItemClick("bitcoin")
  }, []);



  return (
    <div>
      {loader && <Loader />}
      <div className="container-fluid bg-white px-2 rounded shadow-sm pt-3 mt-3">
        <div className="lg:flex">
          <div className="flex grow gap-2 mx-auto justify-center lg:justify-center items-center mb-2 lg:mb-0">
            {chartDays.map((day) => (
              <button
                className={`px-3 py-1 ${
                  day.value === days
                    ? " border-blue-500 border text-blue-500"
                    : ""
                } rounded-md text-xs bg-gray-100`}
                key={day.value}
                onClick={() => {
                  setDays(day.value);
                }}
              >
                {day.label}
              </button>
            ))}
            <img src="https://cdn-icons-png.flaticon.com/512/55/55281.png" alt="React" style={{width:20}}/>
          </div>
          <div className="flex justify-center  items-center">
            <div className="mr-4">
              <MultiSelect
                options={currencyOptions}
                onItemClick={onItemClick}
                values={Object.keys(selectedCurrencies)}
              />
            </div>
            <select
              className="text-transform: capitalize inline-flex justify-center rounded-md bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100"
              onChange={(e) => setChartValue(e.target.value)}
            >
              <option value={`LineChart`}>LineChart</option>
              <option value={`BarChart`}>BarChart</option>
              <option value={`BarHChart`}>BarHChart</option>
            </select>
          </div>
        </div>
        <div className="flex py-0 px-0 mt-2">
          <div className="ml-4 ">{currency.toUpperCase()}</div>
          <div className="grow"></div>

          <div className="flex items-center gap-5 mr-6 text-transform: capitalize">
            {Object.keys(selectedCurrencies).map((el, i) => (
              <div key={i} className="flex items-center">
                <p
                  className="w-3 h-3 rounded-full mr-1"
                  style={{ backgroundColor: chartColors[i].borderColor }}
                ></p>
                <p>{el}</p>
              </div>
            ))}
          </div>
        </div>
        {chartValue === "LineChart" ? (
          <div className="row mx-2">
            <div className="col-md-5 mb-3 mt-3 h-64 ">
              <Line
                data={{
                  labels: Object.values(selectedCurrencies).length
                    ? Object.values(selectedCurrencies)[0].map((val) => {
                        let date = new Date(val[0]);
                        let time =
                          date.getHours() > 12
                            ? `${date.getHours() - 12}:${date.getMinutes()}PM`
                            : `${date.getHours()}:${date.getMinutes()}AM`;
                        return days === 1
                          ? time
                          : date.toLocaleString("default", {
                              month: "short",
                              day: "numeric",
                            });
                      })
                    : [],

                  datasets: Object.values(selectedCurrencies).map(
                    (dataset, i) => {
                      return {
                        data: dataset.map((val) => val[1].toFixed(2)),
                        borderColor: chartColors[i].borderColor,
                        backgroundColor: chartColors[i].backgroundColor,
                      };
                    }
                  ),
                }}
                options={{
                  responsive: true,
                  indexAxis: "x",
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                    title: {
                      display: true,
                    },
                  },
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
        ) : chartValue === "BarChart" ? (
          <div className="row mx-2">
            <div className="col-md-5 mb-3 mt-3 h-72 " style={{ height: 290 }}>
              <Bar
                data={{
                  labels: Object.values(selectedCurrencies).length
                    ? Object.values(selectedCurrencies)[0].map((val) => {
                        let date = new Date(val[0]);
                        let time =
                          date.getHours() > 12
                            ? `${date.getHours() - 12}:${date.getMinutes()}PM`
                            : `${date.getHours()}:${date.getMinutes()}AM`;
                        return days === 1
                          ? time
                          : date.toLocaleString("default", {
                              month: "short",
                              day: "numeric",
                            });
                      })
                    : [],
                  datasets: Object.values(selectedCurrencies).map(
                    (dataset, i) => {
                      return {
                        data: dataset.map((val) => val[1].toFixed(2)),
                        borderColor: chartColors[i].borderColor,
                        backgroundColor: chartColors[i].backgroundColor,
                      };
                    }
                  ),
                }}
                options={{
                  responsive: true,
                  indexAxis: "x",
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                    title: {
                      display: true,
                    },
                  },
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
        ) : (
          <div className="row mx-2">
            <div className="col-md-5 mb-3 mt-3 h-72 " style={{ height: 290 }}>
              <Bar
                data={{
                  labels: Object.values(selectedCurrencies).length
                    ? Object.values(selectedCurrencies)[0].map((val) => {
                        let date = new Date(val[0]);
                        let time =
                          date.getHours() > 12
                            ? `${date.getHours() - 12}:${date.getMinutes()}PM`
                            : `${date.getHours()}:${date.getMinutes()}AM`;
                        return days === 1
                          ? time
                          : date.toLocaleString("default", {
                              month: "short",
                              day: "numeric",
                            });
                      })
                    : [],
                  datasets: Object.values(selectedCurrencies).map(
                    (dataset, i) => {
                      return {
                        data: dataset.map((val) => val[1].toFixed(2)),
                        borderColor: chartColors[i].borderColor,
                        backgroundColor: chartColors[i].backgroundColor,
                      };
                    }
                  ),
                }}
                options={{
                  indexAxis: "y",
                  elements: {
                    bar: {
                      borderWidth: 2,
                    },
                  },
                  responsive: true,
                  scales: {
                    x: {
                      grid: {
                        display: false,
                      },
                    },
                  },
                  plugins: {
                    legend: {
                      display: false,
                    },
                    title: {
                      display: true,
                    },
                  },
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
