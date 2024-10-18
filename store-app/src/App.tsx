import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Layout";
import Products from "./pages/Products";
import "./App.css";

function App() {
  return (
    <Router>
      <Layout>
      <Routes>
        <Route path="/" element={<Products />} />  
      </Routes>
      </Layout>
    </Router>
  );
}

export default App;
