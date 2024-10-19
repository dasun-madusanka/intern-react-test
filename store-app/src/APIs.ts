import axios from "axios";
import { Product } from "./types/Product";

const API_URL = "https://dummyjson.com/products";

export function fetchProducts(limit: number = 30, skip: number = 0) {
  return axios.get(`${API_URL}?limit=${limit}&skip=${skip}`);
}

export function fetchProductById(id: number) {
  return axios.get(`${API_URL}/${id}`);
}

export function addProduct(product: Product) {
  console.log("Product Submitting: "+ product.price);
  return axios.post(`${API_URL}/add`, product);
}

export function deleteProduct(id: number) {
  return axios.delete(`${API_URL}/${id}`);
}