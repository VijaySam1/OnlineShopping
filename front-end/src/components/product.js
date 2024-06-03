import React, { useState,useEffect } from 'react';
import '../style/Product.css';
import Img from '../style/lap.jpg';
import { FaPlusCircle, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const Product = ({ product }) => {

    const [token,settoken]=useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        settoken(token);
    }
  }, [token]);

  const requestBody = {
    quantity:2
  };

  const handleAddToCart = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/products/${product.id}/cart`,requestBody, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      console.log('Product added to cart successfully:', response.data);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/products/${product.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      console.log('Product deleted successfully:', response.data);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  return (
    <div className="product">
      <div className="product-img-container">
        <img src={Img} alt={product.name} />
        <FaPlusCircle className="product-add-icon" onClick={handleAddToCart} />
      </div>
      <div className="product-details">
        <h2>{product.name}</h2>
        <h1>${product.price}</h1>
        <h3>Units Available: {product.unitsAvailable}</h3>
        <p>{product.description}</p>
        <FaTrash className="product-delete-icon" onClick={handleDeleteProduct} />
      </div>
    </div>
  );
};

export default Product;
