import { Link } from "react-router-dom";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Navscroll({ onSearch, onClear }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  const handleClear = () => {
    setQuery(""); 
    onClear(); 
  };

  return (
    <Navbar expand="lg" className="bg-info text-dark position-fixed w-100  top-0 z-index-10">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">MovieHub</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" navbarScroll>
            <Nav.Link as={Link} to="/" className="nav-link-hover">Home</Nav.Link>
            <Nav.Link as={Link} to="/movies/top" className="nav-link-hover">Top Rated</Nav.Link>
            <Nav.Link as={Link} to="/movies/popular" className="nav-link-hover">Popular</Nav.Link>
            <Nav.Link as={Link} to="/movies/upcoming" className="nav-link-hover">Upcoming</Nav.Link>
            <Nav.Link as={Link} to="/movies/now" className="nav-link-hover">Currently Playing</Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant="outline-success" onClick={handleSearch} className="me-2">
              Search
            </Button>
            <Button variant="outline-danger" onClick={handleClear}>
              Clear
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navscroll;
