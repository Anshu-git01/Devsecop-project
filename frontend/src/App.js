import React, { useState } from 'react';
import ProductList from './components/ProductList';
import AddProduct from './components/AddProduct';
import './App.css';

function App() {
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh(prev => !prev);

  return (
    <div className="app">
      <header>
        <h1>Product Manager</h1>
        <p>DevSecOps Demo App</p>
      </header>
      <main>
        <AddProduct onProductAdded={triggerRefresh} />
        <ProductList refresh={refresh} />
      </main>
    </div>
  );
}

export default App;