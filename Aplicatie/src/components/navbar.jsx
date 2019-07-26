import React, { Component } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
class NavBar extends Component {
  state = {};
  render() {
    const navStyle = { color: "blue" };
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="blue">
        <Navbar.Brand href="#home">Smart Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/lumini">Control casa</Nav.Link>
            <Nav.Link href="/securitate">Securitate</Nav.Link>
            <Nav.Link href="/temperatura">
              Temperatura si calitatea aerului
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default NavBar;
