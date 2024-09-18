import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Verifica la ruta a tu archivo CSS

const NavBar = () => {
  return (
    <Navbar bg="brown" variant="dark" expand="lg" className="custom-navbar">
      <Navbar.Brand as={Link} to="/">
        <img
          src="/lucas.png" // La ruta es desde la carpeta public, no necesitas "/public"
          alt="Logo"
          style={{ width: '100px', height: 'auto' }} // Ajusta el tamaño del logo según tus necesidades
        />
      </Navbar.Brand>
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
