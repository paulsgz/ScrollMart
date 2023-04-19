import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import './MainContent.scss';

const MainContent = ({ articles, setArticles }) => {
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [noMoreProducts, setNoMoreProducts] = useState(false);
  const [bufferSize, setBufferSize] = useState(3); // Change this value to control the number of pages fetched at once
  
  const bestBuyApiKey = process.env.BEST_BUY_API_KEY;
  
  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialData = async () => {
    try {
      const pageSize = 10;
      const url = `https://api.bestbuy.com/v1/products(search="all")?format=json&show=all&pageSize=${pageSize}&page=1&sort=customerReviewCount.desc&apiKey=${bestBuyApiKey}`;
      const response = await axios.get(url);

      // Filter out products without images
      const productsWithImages = response.data.products.filter((product) => product.image && product.image.trim() !== '');

      setArticles(productsWithImages);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchData = async () => {
    try {
      let newArticles = [];
      for (let i = 0; i < bufferSize; i++) {
        const response = await axios.get(`https://scrollmartserver.onrender.com/products?page=${currentPage + i}`);
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
