import React, { useState } from 'react';
import NavBar from './components/Navbar/NavBar.js'
import Sidebar from './components/Sidebar/Sidebar.js'
import './App.scss';

function App() {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => setShowSidebar(!showSidebar);

  return (
    <>
      <NavBar toggleSidebar={toggleSidebar} />
      <Sidebar show={showSidebar} toggleSidebar={toggleSidebar} />
      {/* Other components */}
    </>
  );
}

export default App;
