import React, { useEffect, useState } from 'react';
import { Container, Table, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ConfirmationPopup from '../components/ConfirmationPopup'; // Import the popup component
import ProductSearchPage from './ProductSearchPage';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [showPopup, setShowPopup] = useState(false);  // State to show the popup
  const [productToDelete, setProductToDelete] = useState(null);  // Store the product to delete

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

  // Handle deleting a product
  const handleDelete = async (id) => {
    try {
      // Send DELETE request to the API
      const response = await fetch(`http://localhost:5000/api/products/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Update local state to remove the deleted product
        setProducts(products.filter((product) => product._id !== id));
        setShowPopup(false);  // Close the popup
      } else {
        console.error('Error deleting product:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  // Handle showing the popup before deleting a product
  const confirmDelete = (product) => {
    setProductToDelete(product);  // Store the product to delete
    setShowPopup(true);  // Show the popup
  };

  // Handle canceling the deletion
  const cancelDelete = () => {
    setShowPopup(false);  // Close the popup
    setProductToDelete(null);  // Clear the product to delete
  };

  // Handle adding a product to favourites
  const handleFavourite = (product) => {
    if (!favourites.find((fav) => fav._id === product._id)) {
      setFavourites([...favourites, product]);
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
      <Table striped bordered hover>
        <thead>
          <tr>
            {/* <th>ID</th> */}
            <th>SKU</th>
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
              {/* <td>{product._id}</td> */}
              <td>{product.sku}</td>
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
