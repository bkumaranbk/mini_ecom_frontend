import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Header = () => (
  <Navbar bg="dark" variant="dark" className="navbar-custom align-items-center mb-4"  md={8} sm={6} xl={3}>
    {/* Logo */}
    <Navbar.Brand as={Link} to="/" className="brand-text nav-section">
      Logo
    </Navbar.Brand>

    {/* Admin Name and Circle in Top Right */}
    <Nav className="ml-auto d-flex align-items-center ms-auto">
      <div className="admin-section d-flex align-items-center">
        {/* Admin Name */}
        <span className="admin-name">Admin</span>

        {/* Blue Circle and Active Circle */}
        <div className="circle-container ms-3">
          <div className="blue-circle">
            <div className="active-circle"></div>
          </div>
        </div>
      </div>
    </Nav>
  </Navbar>
);

export default Header;
