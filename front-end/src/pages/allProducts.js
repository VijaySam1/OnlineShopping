import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/AllProducts.css';
import Product from '../components/product';

const AllProducts = () => {
  const [products, setProducts] = useState([]);



  useEffect(() => {
    const fetchProducts = async () => {
      try {
    const token = localStorage.getItem("token");
    
        const response = await axios.get('http://localhost:5000/api/products', {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
          });
        if (response.data.message === 'Success') {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [products]);

  const productComponents = [];
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    productComponents.push(
      <div key={product._id} className="product-wrapper">
        <Product
          product={{
            id:product._id,
            name: product.name,
            price: product.price,
            unitsAvailable: product.unitsAvailable,
            description: product.discription,
          }}
        />
      </div>
    );
  }

  return (
    <div className="all-products">
    
      {productComponents}
    </div>
  );
};

export default AllProducts;
