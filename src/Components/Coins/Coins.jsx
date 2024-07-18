import React, { useEffect, useState } from 'react';
import './Coins.css';
import axios from 'axios';

function Coins() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    axios.get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

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

  return (
    <div className='main'>
      <div className='coins'>
        {currentData && currentData.map((item) => (
          <div key={item.id} className='cards'>
            <div className='image'>
              <span>
                <img src={item.image} alt={`${item.name} Image`} />
                <pre>{item.symbol.toUpperCase()}</pre>
              </span>
              <pre id='name'>{item.name}</pre>
            </div>
            <p>Current Price: ${item.current_price}</p>
            <div>
              <p>Change 24H: <span className={item.price_change_percentage_24h >= 0 ? 'positive' : 'negative'}>{item.price_change_percentage_24h}%</span></p>
            </div>
            <div>
              <p>Total Volume: {item.total_volume}</p>
            </div>
          </div>
        ))}
      </div>
      <div className='pagination'>
        <button className='btnP' onClick={handlePrevPage} disabled={page === 1}>Previous</button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={page === index + 1 ? 'active' : ''}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
        <button className='btnP' onClick={handleNextPage} disabled={page === totalPages}>Next</button>
      </div>
    </div>
  );
}
export default Coins;
