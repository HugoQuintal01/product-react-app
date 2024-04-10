import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ProductPage from './page';

ReactDOM.render(
  <BrowserRouter>
    <ProductPage />
  </BrowserRouter>,
  document.getElementById('root')
);
