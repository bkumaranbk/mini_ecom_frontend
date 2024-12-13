import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';
import ProductSearchPage from './pages/ProductSearchPage';
import FavouriteProductsPage from './pages/FavouriteProductsPage';
import Header from './components/Header';

const App = () => (
  <Router>
    <Header />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/add-product" element={<AddProductPage />} />
      <Route path="/edit-product/:id" element={<EditProductPage />} />
      <Route path="/search" element={<ProductSearchPage />} />
      <Route path="/favourites" element={<FavouriteProductsPage />} />
    </Routes>
  </Router>
);

export default App;