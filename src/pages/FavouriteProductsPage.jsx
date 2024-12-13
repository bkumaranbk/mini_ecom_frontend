import React, { useState, useEffect } from 'react';
import { Image, Container, Table, Button, Row, Col } from 'react-bootstrap';
import ProductSearchPage from './ProductSearchPage';
import { Link } from 'react-router-dom';


const FavouriteProductsPage = () => {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products/favourite');
        if (!response.ok) {
          throw new Error('Failed to fetch favourite products');
        }
        const data = await response.json();
        setFavourites(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, []);

  if (loading) {
    return <Container>Loading...</Container>;
  }

  if (error) {
    return <Container>Error: {error}</Container>;
  }

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
      <h1>Favourite Products</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Name</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {favourites.length > 0 ? (
            favourites.map((product) => (
              <tr key={product._id}>
                <td>{product.sku}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.quantity}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>
                  {product.images && product.images.length > 0 ? (
                    <Image
                      src={product.images[0]} 
                      alt={product.name}
                      width={50}
                      height={50}
                      rounded
                    />
                  ) : (
                    <span>No Image</span> 
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No favourite products found
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default FavouriteProductsPage;
