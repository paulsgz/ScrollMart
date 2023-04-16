import React from 'react';
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

function NavBar({ toggleSidebar }) {
  /* Navbar component */
  return (
    <>
      <Navbar expand="lg" className="Nav">
        <Container fluid className="nav-container">
          {/* Scrollmart logo */}
          <Navbar.Brand href="#home" className="logo-container">
            <img src={Logo} alt="Logo" />
          </Navbar.Brand>
          {/* Search bar */}
          <Form className="search-container">
            <FormControl
              type="search"
              placeholder="Search ads or products"
              className="mr-2 search-input rounded-pill"
              aria-label="Search"
            />
            <Button variant="outline-primary" className="search-button rounded-pill">
              Search
            </Button>
          </Form>
          {/* Vertical menu */}
          <Nav className="vertical-menu">
            <Dropdown align="end">
              <Dropdown.Toggle as={Nav.Link} id="dropdown-basic">
                <i className="bi bi-three-dots-vertical"></i>
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
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search ads or products"
            className="mr-2 rounded-pill"
            aria-label="Search"
          />
          <button className="search-icon" type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </Form>
      </div>
      <button className="menu-button" onClick={toggleSidebar}>
        <FaBars />
      </button>
    </>
  );
}

export default NavBar;
