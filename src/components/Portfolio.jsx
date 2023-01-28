import React, { useEffect } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { useState } from 'react';
import numeral from 'numeral';
ChartJS.register(ArcElement, Tooltip, Legend);

//Portfolio component shows the Major crypto currency in pia chart format
function Portfolio() {
  const [totalValume, setTotalValume] = useState("")
  const [label1, setLabel] = useState([])
  const [data1, setdatal] = useState([])

  useEffect(() => {
    //fetchData function fetch data  major crypto currency 
    const fetchData = async () => {
      const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=tether%2Cethereum%2Cbinancecoin&order=market_cap_desc'
      const labelSet = []
      const dataSet1 = [];

      await fetch(url).then((data) => {
        const res = data.json();
        return res
      }).then((res) => {
        for (const val of res) {
          dataSet1.push(val.market_cap);
          labelSet.push(val.name)
        }
        setLabel(labelSet)
        setdatal(dataSet1)
        setTotalValume(dataSet1.reduce((partialSum, a) => partialSum + a, 0).toFixed(0));
      }).catch(e => {
      })
    }
    fetchData();
  }, [])

  return (
    <>
      <div className='flex rounded-lg bg-white shadow-lg relative'>
        <div className='absolute'>
          <h1 className='flex font-semibold font-body ml-6 pl-5 mt-3 mb-2'>Portfolio</h1>
        </div>

        <div className='chart flex mt-2 ml-5 mb-0 ' style={{height: '30%'}}>
          <div>
            <div style={{ height: 170,width:200}}>
              <Pie
                data={{
                  labels: label1,
                  datasets: [
                    {
                      label: '# of Votes',
                      data: data1,
                      backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                      ],
                      borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                      ],
                      borderWidth: 1,
                      offset: [0,20,0]
                    },
                  ],
                }}

                options={{
                  responsive: true,
                  plugins: {
                    legend: {
                      display: true,
                      position: 'right',
                      labels: {
                        usePointStyle: true,
                        pointStyle: 'circle',
                        padding: 10,
                      },
                    },
                    title: {
                      display: false,
                    },
                    datalabels: {
                      display: true,
                      color: 'white',
                      align: 'top       ',
                      position: 'chartArea',
                      labels: {
                        title: {
                          font: {
                            weight: 'bold',
                            size: 13,
                          },
                        },
                      },
                      formatter: (dataSet1) => numeral(dataSet1).format('$0,0'),
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
        <div className='absolute right-3 top-0'>
          <h6 className='mt-2 text-gray-400 mr-0 text-sm'>Total Value</h6>
          <h5><span className='mt-2 font-semibold text-gray-900'>${totalValume}</span></h5> 
        </div>
      </div>

    </>
  );
}

export default Portfolio;
