import React, { useState } from 'react';
import { FaBars, FaTimes, FaAngleDown, FaAngleUp } from 'react-icons/fa';
import Logo from '../../images/scrollmartLogo.png';
import './Sidebar.scss';

function Sidebar({ show, toggleSidebar }) {
  const [sidebar, setSidebar] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(false);

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

  return (
    <div id="sidebarMenu" className={`sidebar bg-white${show ? ' show' : ''}`}>
    <button className="sidebar-exit" onClick={toggleSidebar}>
      <FaTimes />
    </button>
    {show && <img src={Logo} alt="Logo" className="logo" />} {/* Replace with your logo */}
      <div className="position-sticky">
        <div className="visit-count">
          <h3>Visit Count</h3>
          <p className="visit-number">{visitCount.toLocaleString()}</p>
        </div>
        <div className="featured-ads">
          <h3>Featured Ads</h3>
          {featuredAds.map((ad, index) => (
            <div className="featured-ad" key={index}>
              {ad.title}
            </div>
          ))}
        </div>
        <div className="categories">
          <h3>Categories</h3>
          {categories.slice(0, showAllCategories ? categories.length : 7).map((category, index) => (
            <div className="category" key={index}>
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
          </div>
          <p className="copyright">ScrollMart 2023 © Christian Seguiza</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
