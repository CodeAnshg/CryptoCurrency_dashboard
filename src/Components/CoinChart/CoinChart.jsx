import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './CoinChart.css';

const CoinChart = () => {
  const [marketData, setMarketData] = useState({
    day30: null,
    day1: null,
    hour1: null,
  });
  const [activeRange, setActiveRange] = useState('day30');

  const fetchMarketData = async (range) => {
    try {
      const response = await fetch(`https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=${range}`);
      const data = await response.json();
      return data.prices;
    } catch (error) {
      console.error(`Error fetching market data for ${range} days:`, error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const day30 = await fetchMarketData(30);
      const day1 = await fetchMarketData(1);
      const hour1 = await fetchMarketData(1 / 24);

      setMarketData({
        day30,
        day1,
        hour1,
      });
    };

    fetchData();
  }, []);

  const createChartData = (prices) => ({
    labels: prices.map((price) => new Date(price[0]).toLocaleDateString()),
    datasets: [
      {
        label: 'Price in USD',
        data: prices.map((price) => price[1]),
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  });

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `$${tooltipItem.raw.toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        ticks: {
          callback: (value) => `$${value.toFixed(2)}`,
        },
      },
    },
  };

  const handleRangeChange = (range) => {
    setActiveRange(range);
  };

  return (
    <div className="cont">
      <h3>Analyse Your Coin</h3>
      <div className="coin-chart">
        <div className="button-group">
          <button onClick={() => handleRangeChange('day30')}>Last 30 Days</button>
          <button onClick={() => handleRangeChange('day1')}>Last 1 Day</button>
          <button onClick={() => handleRangeChange('hour1')}>Last 1 Hour</button>
        </div>
        {marketData[activeRange] && (
          <Line data={createChartData(marketData[activeRange])} options={options} />
        )}
      </div>
    </div>
  );
};

export default CoinChart;
