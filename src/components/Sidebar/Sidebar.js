import React, { useState, useEffect } from 'react';
import { FaTimes, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import Logo from '../../images/scrollmartLogo.png';
import CountUp from 'react-countup';
import axios from 'axios';
import ReactGA from 'react-ga';
import './Sidebar.scss';

function Sidebar({ show, toggleSidebar, setMainArticles, showAbout, showContact}) {
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1008);
  const [pageviews, setPageviews] = useState(0);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  const trackingId ='G-MP4VEP0F69'; // Replace with your Google Analytics tracking ID
  ReactGA.initialize(trackingId);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1008);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function trackPageView() {
    ReactGA.pageview(window.location.pathname + window.location.search, [], 'Sidebar');
    setPageviews(prevPageviews => prevPageviews + 1);
  }

  const toggleCategories = () => setShowAllCategories(!showAllCategories);
  
  useEffect(() => {
    trackPageView()
    console.log(pageviews);
    console.log(trackPageView());
  }, []);

  const categories = [
    'Electronics and Gadgets', 'Fashion and Apparel', 'Health and Beauty', 'Home and Garden', 'Sports and Outdoors',
    'Food and Beverage', 'Travel and Experiences', 'Automotive', 'Toys and Games', 'Books and Media',
    'Fitness and Wellness', 'Arts and Crafts', 'Pets and Animals', 'Services and Consultations', 'Business and Finance',
  ];

  const categoryIcons = [
    'fas fa-laptop',
    'fas fa-tshirt',
    'fas fa-briefcase-medical',
    'fas fa-home-lg-alt',
    'fas fa-basketball-ball',
    'fas fa-utensils',
    'fas fa-globe-americas',
    'fas fa-car',
    'fas fa-gamepad',
    'fas fa-book-open',
    'fas fa-running',
    'fas fa-paint-brush',
    'fas fa-dog',
    'fas fa-phone-alt',
    'fas fa-chart-line',
  ];

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const handleCategoryClick = (index) => {
    setActiveCategory(index);
    axios
      .get(`https://scrollmartserver.onrender.com/search?title=${categories[index]}`)
      .then((response) => {
        setMainArticles(response.data.products);
        scrollToTop();
      })
      .catch((error) => console.error(error));
  };

  const fetchFeaturedProducts = async () => {
    try {
      const response = await axios.get('https://scrollmartserver.onrender.com/featured-products');
      setFeaturedProducts(response.data.products);
    } catch (error) {
      console.error(error);
    }
  };
  
  
  useEffect(() => {
    fetchFeaturedProducts();
  }, []);
  

  return (
  <div id="sidebarMenu" className={`sidebar bg-white${show ? ' show' : ''}`}>
    <button className="sidebar-exit" onClick={toggleSidebar}>
      <FaTimes />
    </button>
    {show && <img src={Logo} alt="Logo" className="logo" />} 
    <div className="position-sticky">
        <div className="visit-count">
          <h4 className='sidebar-title'>Visit Count</h4>
          <p className="visit-number sidebar-subtitle">
            <CountUp end={pageviews} duration={4} separator="," />
          </p>
        </div>
        <div className="featured-ads">
          <h4 className='sidebar-title'>Featured Ads</h4>
          {featuredProducts.map((product, index) => (
            <a href={product.url} target="_blank" rel="noopener noreferrer" key={index} className='.sidebar-subtitle'>
              <div className="featured-ad ">
                {product.name}
              </div>
            </a>
          ))}
        </div>
      <div className="categories">
        <h4 className='sidebar-title'>Categories</h4>
          {categories.slice(0, showAllCategories ? categories.length : 7).map((category, index) => (
            <div
            className={`category${index === activeCategory ? ' active' : ''} `}
            key={index}
            onClick={() => handleCategoryClick(index)}
            >
            <i className={categoryIcons[index]}></i>
                    {category}
            </div>
        ))}
        <button className="show-more" onClick={toggleCategories}>
          {showAllCategories ? 'See Less' : 'See More'}
          {showAllCategories ? <FaAngleUp /> : <FaAngleDown />}
        </button>
      </div>
      <div className="footer">
        <div className="footer-links">
          <a onClick={showAbout}>About</a>
          <a onClick={showContact}>Contact</a>
          {isSmallScreen && (
            <>
              <a href="#">Languages</a>
              <a href="#">FAQs</a>
              <a href="#">Dark Mode</a>
            </>
          )}
        </div>
        <p className="copyright">ScrollMart 2023 © Christian Seguiza</p>
      </div>
    </div>
  </div>
);
}

export default Sidebar;

