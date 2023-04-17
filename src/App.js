import React, { useState } from 'react';
import NavBar from './components/Navbar/NavBar.js';
import Sidebar from './components/Sidebar/Sidebar.js';
import MainContent from './components/Main/MainContent.js';
import './App.scss';

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <>
      <NavBar toggleSidebar={toggleSidebar} />
      <div className="app-container">
        <Sidebar show={showSidebar} toggleSidebar={toggleSidebar} />
        <div className="main-wrapper">
          <MainContent />
          {/* Other components */}
        </div>
      </div>
    </>
  );
}

export default App;
