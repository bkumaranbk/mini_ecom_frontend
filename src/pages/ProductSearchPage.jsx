import React from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const ProductSearchPage = () => (
  <Container className="mb-3">
    <Form className="mt-3">
      <Row className="align-items-center">
        <Col xs={9} sm={10}>
          <Form.Group controlId="formSearch" className="mb-0">
            <Form.Control type="text" placeholder="Search for a product" />
          </Form.Group>
        </Col>
        <Col xs={3} sm={2} className="text-end">
          <Button variant="primary" type="submit">
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  </Container>
);

export default ProductSearchPage;
