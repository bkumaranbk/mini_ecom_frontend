import React, { useState } from 'react';
import { Container, Table, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductSearchPage from './ProductSearchPage';

const HomePage = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Sample Product 1', category: 'Category 1' },
    { id: 2, name: 'Sample Product 2', category: 'Category 2' },
    { id: 3, name: 'Sample Product 3', category: 'Category 3' },
  ]);

  const [favourites, setFavourites] = useState([]);

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleFavourite = (product) => {
    if (!favourites.find((fav) => fav.id === product.id)) {
      setFavourites([...favourites, product]);
    }
  };

  return (
    <Container>
      <Row className="align-items-center mb-4">
        <Col md={6}>
          <ProductSearchPage />
        </Col>
        <Col md={6} className="text-end">
          <Link to="/add-product" className="btn btn-primary me-2">Add Product</Link>
          <Link to="/favourites" className="btn btn-secondary">Favourites</Link>
        </Col>
      </Row>
      <h1>Product List</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  href={`/edit-product/${product.id}`}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="me-2"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleFavourite(product)}
                >
                  Favourite
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default HomePage;