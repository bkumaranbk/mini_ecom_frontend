import React, { useState } from 'react';
import { Container, Form, Table, Button, Row, Col, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductSearchPage from './ProductSearchPage';
import {  useNavigate } from 'react-router-dom';


const AddProductPage = () => {
  const navigate = useNavigate(); 
  // Define state for form fields
  const [sku, setSku] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newProduct = {
      sku,
      name,
      description,
      quantity,
      price,
      images,
    };

    try {
      const response = await fetch('http://localhost:5000/api/products/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const data = await response.json();
      setSuccess(true);
      // Optionally reset the form
      setSku('');
      setName('');
      setDescription('');
      setQuantity(0);
      setPrice(0);
      setImages([]);
      navigate('/');
    } catch (error) {
      setError(error.message);
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
      <h2>Add Product</h2>
      {success && <Alert variant="success">Product added successfully!</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formProductSku">
          <Form.Label>SKU</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product SKU"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formProductName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formProductDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter product description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formProductQuantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter product quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formProductPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            placeholder="Enter product price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formProductImages">
          <Form.Label>Product Images (comma separated)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter image paths (comma separated)"
            value={images}
            onChange={(e) => setImages(e.target.value.split(','))}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Product
        </Button>
      </Form>
    </Container>
  );
};

export default AddProductPage;
