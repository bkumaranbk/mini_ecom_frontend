import React, { useEffect, useState } from 'react';
import {Image, Container, Table, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ConfirmationPopup from '../components/ConfirmationPopup';
import ProductSearchPage from './ProductSearchPage';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);


  const handleDelete = async (id) => {
    try {

      const response = await fetch(`http://localhost:5000/api/products/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {

        setProducts(products.filter((product) => product._id !== id));
        setShowPopup(false);
      } else {
        console.error('Error deleting product:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };


  const confirmDelete = (product) => {
    setProductToDelete(product);
    setShowPopup(true);
  };


  const cancelDelete = () => {
    setShowPopup(false);
    setProductToDelete(null);
  };


  const handleFavourite = async (product) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/favourite/${product._id}`, {
        method: 'PATCH',
      });

      if (response.ok) {

        const updatedResponse = await fetch('http://localhost:5000/api/products');
        const updatedData = await updatedResponse.json();
        setProducts(updatedData);
      } else {
        console.error('Error updating favourite:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating favourite:', error);
    }
  };

  return (
    <Container>
      <>
        <Row className="align-items-center mb-4">
          <Col md={6}>
            <ProductSearchPage />
          </Col>
          <Col md={6} className="text-end">
            <Link to="/add-product" className="btn btn-primary me-2">Add Product</Link>
            <Link to="/favourites" className="btn btn-secondary">Favourites</Link>
          </Col>
        </Row>
      </>
      <h1>Product List</h1>
      <Table striped hover>
        <thead>
          <tr>
            <th>SKU</th>
            <th>Image</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product.sku}</td>
              <td>
                <Image
                  src={product.image}
                  alt={product.name}
                  width={50}
                  height={50}
                  rounded
                />

              </td>
              <td>{product.name}</td>
              <td>{product.description}</td>
              <td>{product.quantity}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  href={`/edit-product/${product._id}`}
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  className="me-2"
                  onClick={() => confirmDelete(product)}
                >
                  Delete
                </Button>
                <Button
                  variant={product.favorite ? "success" : "info"}
                  size="sm"
                  onClick={() => handleFavourite(product)}
                  className={product.favorite ? "rounded-pill" : ""}
                >
                  Favourite
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Confirmation Popup for Deletion */}
      <ConfirmationPopup
        show={showPopup}
        onHide={cancelDelete}
        onConfirm={() => handleDelete(productToDelete._id)}
        message="Are you sure you want to delete this product?"
      />
    </Container>
  );
};

export default HomePage;
