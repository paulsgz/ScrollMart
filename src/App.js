import React, { useState, useEffect } from 'react';
import NavBar from './components/Navbar/NavBar.js';
import Sidebar from './components/Sidebar/Sidebar.js';
import MainContent from './components/Main/MainContent.js';
import About from './components/About/About.js';
import Contact from './components/Contact/Contact.js'
import axios from 'axios';
import './App.scss';

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [mainArticles, setMainArticles] = useState([]);
  const [showAbout, setShowAbout] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const toggleSidebar = () => setShowSidebar(!showSidebar);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const fetchDefaultData = () => {
    const APIurl = `https://scrollmartserver.onrender.com/products?page=1`;
    const DEVurl = `http://localhost:10000/products?page=1`
    axios
      .get(APIurl)
      .then((response) => {
        // Shuffle the products array randomly
        const shuffledProducts = response.data.products.sort(() => Math.random() - 0.5);
        setMainArticles(shuffledProducts);
      })
      .catch((error) => console.error(error));
  };

  const handleShowAbout = () => {
    setShowContact(false);
    setShowAbout(true);
    scrollToTop();
  };

  const handleShowContact = () => {
    setShowAbout(false);
    setShowContact(true);
    scrollToTop();
  };

  const handleMainClick = () => {
    setShowContact(false);
    setShowAbout(false);
    setMainArticles([]);
    fetchDefaultData();
    scrollToTop();
  };
  
  return (
    <>
      <NavBar
        toggleSidebar={toggleSidebar}
        setMainArticles={setMainArticles}
        onLogoClick={() => {
          // Reset the main content with the default data.
          fetchDefaultData();
            setShowContact(false);
            setShowAbout(false);
          // Scroll to the top of the page.
          scrollToTop();
        }}
      />
      <div className="app-container">
        <Sidebar
          show={showSidebar}
          toggleSidebar={toggleSidebar}
          setMainArticles={setMainArticles}
          showAbout={handleShowAbout} 
          showContact={handleShowContact} 
                />
        <div className="main-wrapper">
          {showAbout && !showContact && <About />}
          {showContact && !showAbout && <Contact />}
          {!showAbout && !showContact && (
            <MainContent articles={mainArticles} setArticles={setMainArticles} />
          )}
        </div>

      </div>
    </>
  );
}

export default App;
