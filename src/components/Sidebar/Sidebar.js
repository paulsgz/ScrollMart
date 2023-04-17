import React, { useState, useEffect } from 'react';
import { FaTimes, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import Logo from '../../images/scrollmartLogo.png';
import CountUp from 'react-countup';
import './Sidebar.scss';

function Sidebar({ show, toggleSidebar }) {
  const [sidebar, setSidebar] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1008);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1008);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const showSidebar = () => setSidebar(!sidebar);
  const toggleCategories = () => setShowAllCategories(!showAllCategories);

  // Replace with your actual data
  const visitCount = 1000001;
  const featuredAds = [
    { title: 'Featured Ad 1' },
    { title: 'Featured Ad 2' },
    { title: 'Featured Ad 3' },
  ];
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
  
  const handleCategoryClick = (index) => {
    setActiveCategory(index);
  };

  return (
  <div id="sidebarMenu" className={`sidebar bg-white${show ? ' show' : ''}`}>
    <button className="sidebar-exit" onClick={toggleSidebar}>
      <FaTimes />
    </button>
    {show && <img src={Logo} alt="Logo" className="logo" />} {/* Replace with your logo */}
    <div className="position-sticky">
      <div className="visit-count">
        <h4 className='sidebar-title'>Visit Count</h4>
        <p className="visit-number sidebar-subtitle">
          <CountUp start={0} end={visitCount} duration={4} separator="," />
        </p>
      </div>
      <div className="featured-ads">
        <h4 className='sidebar-title'>Featured Ads</h4>
        {featuredAds.map((ad, index) => (
          <div className="featured-ad" key={index}>
            {ad.title}
          </div>
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
          <a href="#">About</a>
          <a href="#">Contact</a>
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

