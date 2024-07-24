import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Coins.css';

const Coins = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState('USD');
  const itemsPerPage = 10;

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching data", error);
      });
  }, [currency]);

  const handleCurrencyChange = (event) => {
    const select = event.target.value;
    setCurrency(select);
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleNextPage = () => {
    setPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const renderPaginationButtons = () => {
    const buttons = [];

    buttons.push(
      <button
        key={1}
        className={page === 1 ? 'active' : ''}
        onClick={() => handlePageChange(1)}
      >
        1
      </button>
    );

    if (page > 3) {
      buttons.push(<span key="dots1">...</span>);
    }

    if (page > 2) {
      buttons.push(
        <button
          key={page - 1}
          className={page === page - 1 ? 'active' : ''}
          onClick={() => handlePageChange(page - 1)}
        >
          {page - 1}
        </button>
      );
    }

    if (page > 1 && page < totalPages) {
      buttons.push(
        <button
          key={page}
          className="active"
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      );
    }

    if (page < totalPages - 1) {
      buttons.push(
        <button
          key={page + 1}
          className={page === page + 1 ? 'active' : ''}
          onClick={() => handlePageChange(page + 1)}
        >
          {page + 1}
        </button>
      );
    }

    if (page < totalPages - 2) {
      buttons.push(<span key="dots2">...</span>);
    }

    if (totalPages > 1) {
      buttons.push(
        <button
          key={totalPages}
          className={page === totalPages ? 'active' : ''}
          onClick={() => handlePageChange(totalPages)}
        >
          {totalPages}
        </button>
      );
    }

    return buttons;
  };

  return (
    <div className="coins-container">
      <div className="coin-head">
        <span>Coin Chart</span>
        <select name="currency" id="currency" value={currency} onChange={handleCurrencyChange}>
          <option value="USD">USD</option>
          <option value="INR">INR</option>
        </select>
      </div>
      <div className='coin-table'>
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Amount</th>
            <th>Price in USD</th>
            <th>Change 24h</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item) => (
            <tr key={item.id}>
              <td>
                <img
                  src={item.image}
                  alt={item.name}
                  style={{
                    width: '20px',
                    height: '20px',
                    objectFit: 'cover',
                    marginRight: '8px',
                  }}
                />
                {item.symbol.toUpperCase()}
              </td>
              <td>{item.total_volume}</td>
              <td>{item.current_price.toFixed(2)}</td>
              <td className={item.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}>
                {item.price_change_percentage_24h.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <div className="pagination">
        <button className="btnP" onClick={handlePrevPage} disabled={page === 1}>Previous</button>
        {renderPaginationButtons()}
        <button className="btnP" onClick={handleNextPage} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
};

export default Coins;
