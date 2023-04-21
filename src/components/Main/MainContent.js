import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import './MainContent.scss';

const MainContent = ({ articles, setArticles }) => {
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [noMoreProducts, setNoMoreProducts] = useState(false);
  const [bufferSize, setBufferSize] = useState(3); // Change this value to control the number of pages fetched at once

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let newArticles = [];
      for (let i = 0; i < bufferSize; i++) {
        const DEVurl = `http://localhost:10000/products?page=${currentPage + i}`
        const APIurl = `https://scrollmartserver.onrender.com/products?page=${currentPage + i}`;
        const response = await axios.get(APIurl);
        newArticles = [...newArticles, ...response.data.products];

        // Set the noMoreProducts flag
        if (response.data.noMoreProducts) {
          setNoMoreProducts(true);
          break;
        }
      }

      setArticles([...articles, ...newArticles]);
      setCurrentPage(currentPage + bufferSize);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShopNowClick = (article) => {
    window.open(article.url, '_blank');
  };

  return (
    <div className="main-content">
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <strong>There are no more items to show.</strong>
          </p>
        }
      >
        {articles.map((article, index) => (
          <div key={index} className="ad-container">
            <div className="ad-media">
              <img src={article.image} alt={article.name} />
            </div>
            <div className="ad-info">
              <h4 className="ad-title">{article.name}</h4>
              <p className="ad-description">{article.shortDescription}</p>
              <p className="ad-price">${article.salePrice}</p>
              <button
                className="shop-now-btn btn-primary rounded-pill"
                onClick={() => handleShopNowClick(article)}
              >
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </InfiniteScroll>
      {noMoreProducts && <p>You have reached the end of available content.</p>}
    </div>
  );
};

export default MainContent;
