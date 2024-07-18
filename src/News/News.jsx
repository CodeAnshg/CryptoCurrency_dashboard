import  { useState, useEffect } from 'react';
import './News.css';

function News() {
  const [news, setNews] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);

  const fetchNews = async () => {
    try {
      let response = await fetch(
        "https://newsapi.org/v2/everything?q=bitcoin&apiKey=f80a99286b1246baaed006606085025a"
      );
      let result = await response.json();
      setNews(result.articles.slice(0, 4)); 
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []); 

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleImageClick = (article) => {
    setSelectedArticle(article);
  };

  const handleBackClick = () => {
    setSelectedArticle(null);
  };

  return (
    <div className="news-container">
      {selectedArticle ? (
        <div className="article-detail">
          <button className="back-button" onClick={handleBackClick}>
            Back
          </button>
          <img src={selectedArticle.urlToImage} alt="article" className="news-image" />
          <div className="article-content">
            <h4>{selectedArticle.title}</h4>
            <p>{selectedArticle.content}</p>
            <a href={selectedArticle.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </div>
        </div>
      ) : (
        <>
          <button className="load-button" onClick={fetchNews}>
             News
          </button>
          <div className={`news-grid ${isMobileView ? 'mobile-view' : 'desktop-view'}`}>
            {news.map((item, key) => (
              <div className="news-card" key={key} onClick={() => handleImageClick(item)}>
                <img src={item.urlToImage} alt="article" className="news-image" />
                <div className="card-content">
                  <h4>{item.title}</h4>
                  <p>{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default News;




