import React from 'react';
import { Container, Form, Button, Table } from 'react-bootstrap';

const ProductSearchPage = () => (
  <Container>
    <Form>
      <Form.Group controlId="formSearch">
        <Form.Control type="text" placeholder="Search for a product" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Search
      </Button>
    </Form>
  </Container>
);

export default ProductSearchPage;