import axios from "axios";
import { Product } from "./types/Product";

const API_URL = "https://dummyjson.com/products";

export function fetchProducts() {
  return axios.get(API_URL);
}

export function fetchProductById(id: number) {
  return axios.get(`${API_URL}/${id}`);
}

export const addProduct = (product: Product) =>
  axios.post(`${API_URL}/add`, product);
export const deleteProduct = (id: number) => axios.delete(`${API_URL}/${id}`);
