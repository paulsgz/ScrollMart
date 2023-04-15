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
import Logo from '../../images/scrollmartLogo.png'
import './Navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


function NavBar() {
    return (
<>
<Navbar bg="light" expand="lg" className="Nav">
  <Container>
    <Navbar.Brand href="#home"><img src={Logo} alt="Logo" /></Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Nav className="me-auto"></Nav>
      <Form className="Form">
  <FormControl
    type="search"
    placeholder="Search ads or products"
    className="mr-2 search-input rounded-pill"
    aria-label="Search"
  />
  <Button variant="outline-primary" className="search-button rounded-pill">Search</Button>
</Form>

      <Nav className="d-none d-lg-block vertical-menu">
        <Dropdown alignRight>
          <Dropdown.Toggle as={Nav.Link} id="dropdown-basic">
            <i className="bi bi-three-dots-vertical"></i>
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#action-1">Language</Dropdown.Item>
            <Dropdown.Item href="#action-2">FAQs</Dropdown.Item>
            <Dropdown.Item href="#action-3">Dark Mode</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
  </Container>
</Navbar>
<div className='searchBar'>
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
</>
    );
}
export default NavBar;