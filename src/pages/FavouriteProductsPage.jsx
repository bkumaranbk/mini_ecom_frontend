import React, { useState } from 'react';
import { Container, Table } from 'react-bootstrap';

const FavouriteProductsPage = () => {
  const [favourites, setFavourites] = useState([
    { id: 1, name: 'Sample Product 1', category: 'Category 1' },
  ]); // Replace with state lifting or context in real scenarios

  return (
    <Container>
      <h1>Favourite Products</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {favourites.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default FavouriteProductsPage;
