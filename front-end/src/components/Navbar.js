import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { FaShoppingCart, FaList, FaPowerOff } from "react-icons/fa";
import { IoIosHome } from "react-icons/io";
// import { BiAddToQueue } from "react-icons/bi";

const Navbar = () => {
    
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedin(true);
    }
  }, []);

  if (isLoggedin) {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Home <IoIosHome size="20px" className='carticon' /></Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style={{ '--bs-scroll-height': '100px' }}>
              <li className="nav-item">
                <Link className="nav-link active" aria-current="page" to="/allProducts">View Products</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/addProduct">Add Product</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  } else {
    return null;
  }
};

export default Navbar;
