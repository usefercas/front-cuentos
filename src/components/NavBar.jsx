import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <Navbar bg="brown" variant="dark" expand="lg" className="custom-navbar">
      <Navbar.Brand as={Link} to="/">
        <img
          src="/lucas.png"
          alt="Logo"
          className="left-logo"
        />
      </Navbar.Brand>

      {/* Imagen en el centro */}
      <div className="navbar-center">
        <img
          src="/chip.png"
          alt="León"
          className="center-image"
        />
      </div>

      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">Inicio</Nav.Link>
          <Nav.Link as={Link} to="/crear">Crear Libro</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
