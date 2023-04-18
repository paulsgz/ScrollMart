import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Navbar,
  Nav,
  FormControl,
  Button,
  Form,
  Dropdown,
} from 'react-bootstrap';
import Logo from '../../images/scrollmartLogo.png';
import './Navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FaBars, FaTimes, FaAngleDown, FaAngleUp } from 'react-icons/fa';

function NavBar({ toggleSidebar,  setMainArticles, onLogoClick  }) {
  const [searchQuery, setSearchQuery] = useState('');

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };
  
  const handleSearch = () => {
    axios
      .get(`https://scrollmartserver.onrender.com/search?title=${searchQuery}`)
      .then((response) => {
        setMainArticles(response.data.products);
      })
      .catch((error) => console.error(error));
  };

  const handleSearchWithUpdate = () => {
    handleSearch();
    scrollToTop();
  };

  /* Navbar component */
  return (
    <>
      <Navbar expand="lg" className="Nav">
        <Container fluid className="nav-container">
          {/* Scrollmart logo */}
          <Navbar.Brand className="logo-container" onClick={onLogoClick} >
            <img src={Logo} alt="Logo" />
          </Navbar.Brand>
          {/* Search bar */}
          <Form className="search-container" onSubmit={e => { e.preventDefault(); handleSearchWithUpdate(); }}>
             <FormControl
              type="search"
              placeholder="Search ads or products"
              className="mr-2 search-input rounded-pill"
              aria-label="Search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <Button
              variant="outline-primary"
              className="search-button rounded-pill"
              onClick={handleSearchWithUpdate}
            >
              Search
            </Button>
          </Form>
          {/* Vertical menu */}
          <Nav className="vertical-menu">
            <Dropdown align="end">
              <Dropdown.Toggle as={Nav.Link} id="dropdown-basic">
              <i className="bi bi-three-dots-vertical" style={{ fontSize: '32px' }}></i>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#action-1">Languages</Dropdown.Item>
                <Dropdown.Item href="#action-2">FAQs</Dropdown.Item>
                <Dropdown.Item href="#action-3">Dark Mode</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
      {/* Search bar for small screens */}
      <div className="searchBar">
      <Form className="d-flex" onSubmit={e => { e.preventDefault(); handleSearchWithUpdate(); }}>
        <button className="menu-button" onClick={(event) => {
            event.preventDefault();
            toggleSidebar();
          }}>
            <FaBars />
         </button>
         <FormControl
              type="search"
              placeholder="Search ads or products"
              className="mr-2 search-input rounded-pill"
              aria-label="Search"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
          <button className="search-icon" onClick={handleSearch}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </Form>
      </div>
    </>
  );
}

export default NavBar;
