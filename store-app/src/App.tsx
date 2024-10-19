import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import SingleProduct from "./pages/SingleProduct";
import "./App.css";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/products/:id" element={<SingleProduct />} />
          <Route path="/products/add" element={<AddProduct />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
