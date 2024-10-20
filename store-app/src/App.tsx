import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import SingleProduct from "./pages/SingleProduct";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./pages/Login";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Products />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/products/:id"
            element={
              <PrivateRoute>
                <SingleProduct />
              </PrivateRoute>
            }
          />
          <Route
            path="/products/add"
            element={
              <PrivateRoute>
                <AddProduct />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
