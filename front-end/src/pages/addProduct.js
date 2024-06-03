import React, { useState,useEffect } from 'react';
import { useNavigate} from 'react-router-dom';

import axios from 'axios';
import '../style/AddProduct.css';

const AddProduct = () => {
  const navigate=useNavigate()

  const [name, setProductName] = useState('');
  const [category, setProductCategory] = useState('');
  const [price, setPrice] = useState('');
  const [unitsAvailable, setUnits] = useState('');
  const [discription, setDescription] = useState('');
  const [token,settoken]=useState('');

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
        settoken(token);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name,
      category,
      price,
      unitsAvailable,
      discription
    };

    try {

      const response = await axios.post('http://localhost:5000/api/products', productData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      console.log('Product added successfully:', response.data);
      // Clear the form fields
      navigate("/allProducts")
      setProductName('');
      setProductCategory('');
      setPrice('');
      setUnits('');
      setDescription('');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="add-product">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Product Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setProductCategory(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Total Units:</label>
          <input
            type="number"
            value={unitsAvailable}
            onChange={(e) => setUnits(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={discription}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
};

export default AddProduct;
