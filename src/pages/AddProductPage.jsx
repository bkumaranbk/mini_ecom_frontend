import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';

const AddProductPage = () => (
  <Container>
    <h2>Add Product</h2>
    <Form>
      <Form.Group controlId="formProductName">
        <Form.Label>Product Name</Form.Label>
        <Form.Control type="text" placeholder="Enter product name" />
      </Form.Group>

      <Form.Group controlId="formCategory">
        <Form.Label>Category</Form.Label>
        <Form.Control type="text" placeholder="Enter category" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Add Product
      </Button>
    </Form>
  </Container>
);

export default AddProductPage;