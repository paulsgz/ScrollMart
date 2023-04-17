import React, { useState, useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import './MainContent.scss';

const MainContent = () => {
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    // Replace this part with your API call to get the actual data
    setTimeout(() => {
      setItems(items.concat(Array.from({ length: 10 })));
    }, 500);
  };

  const handleShopNowClick = (item) => {
    // Handle "Shop Now" button click, redirect to the product site
  };

  return (
    <div className="main-content">
      <InfiniteScroll
        dataLength={items.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: 'center' }}>
            <strong>There are no more items to show.</strong>
          </p>
        }
      >
        {items.map((item, index) => (
          <div key={index} className="ad-container">
            {/* Replace this with a video or image carousel */}
            <div className="ad-media">
              <img src="https://via.placeholder.com/300" alt="Placeholder" />
            </div>
            <div className="ad-info">
              <h4 className="ad-title">Ad Title {index + 1}</h4>
              <p className="ad-description">Ad Description {index + 1}</p>
              <p className="ad-price">$100.00</p>
              <button
                className="shop-now-btn btn-primary rounded-pill"
                onClick={() => handleShopNowClick(item)}
              >
                Shop Now
              </button>
            </div>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default MainContent;
