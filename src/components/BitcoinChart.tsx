// src/components/BitcoinChart.tsx

import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js'
import { Line } from 'react-chartjs-2';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { DataSelector, fetchData } from '../reducers/bitcoinReducer';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  )

const BitcoinChart: React.FC = () => {
  const dispatch = useAppDispatch();
  const bitcoinData = useAppSelector(DataSelector);
  
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: 'Bitcoin Price (USD)',
        data: [],
      },
      {
        label: 'Bitcoin Price (EUR)',
        data: [],
      },
      {
        label: 'Bitcoin Price (GBP)',
        data: [],
      },
    ],
  });

  useEffect(() => {
    dispatch(fetchData());

    const fetchDataInterval = setInterval(() => {
        dispatch(fetchData());
    }, 15000);

    return () => {
      clearInterval(fetchDataInterval);
    };
  }, [dispatch]);


  return (
    <div>
      <Line data={chartData} />
    </div>
  );
};

export default BitcoinChart;
