import Header from './components/header/Header';
import Menu from './components/menu/Menu';
import ProductList from './components/product-list/ProductList';
import ProductPage from './products/[productId]/page'; // Import the ProductPage component
import TopAnchor from './components/top-anchor/TopAnchor';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:productId" element={<ProductPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
