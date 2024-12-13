import React, { useState, useEffect } from 'react';
import { Container ,Form, Table, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProductSearchPage from './ProductSearchPage';

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 

  const [product, setProduct] = useState({
    sku: '',
    name: '',
    description: '',
    quantity: '',
    price: '',
    images: [],
    favorite: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.put(`http://localhost:5000/api/products/edit/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching product data:", err);
        setError('Failed to fetch product data');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/products/edit/${id}`, product);
      navigate('/');
    } catch (err) {
      console.error("Error saving product data:", err);
      setError('Failed to save product data');
    }
  };

  if (loading) return <p>Loading...</p>;

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
      <h2>Edit Product {id}</h2>
      {error && <p className="text-danger">{error}</p>}
      <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formProductSku">
          <Form.Label>SKU</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product SKU"
            value={product.sku}
            onChange={(e) => setProduct({ ...product, sku: e.target.value })}
          />
        </Form.Group>
        <Form.Group controlId="formProductName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formProductDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter product description"
            value={product.description}
            onChange={(e) => setProduct({ ...product, description: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formProductQuantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter quantity"
            value={product.quantity}
            onChange={(e) => setProduct({ ...product, quantity: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formProductPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            placeholder="Enter price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />
        </Form.Group>

        <Form.Group controlId="formProductImages">
          <Form.Label>Images</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image URLs"
            value={product.images}
            onChange={(e) => setProduct({ ...product, images: e.target.value.split(',') })}
          />
        </Form.Group>

        <Form.Group controlId="formFavorite">
          <Form.Check
            type="checkbox"
            label="Favorite"
            checked={product.favorite}
            onChange={(e) => setProduct({ ...product, favorite: e.target.checked })}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
};

export default EditProductPage;
