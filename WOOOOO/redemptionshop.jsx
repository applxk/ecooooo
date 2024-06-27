import React, { useState, useEffect } from 'react';
import '../../assets/styles/redemptionshop.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function RedemptionShop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/eco/product-detail');
      if (Array.isArray(response.data)) {
        // Sort products based on leaves ascending
        const sortedProducts = response.data.sort((a, b) => a.leaves - b.leaves);
        setProducts(sortedProducts);
      } else {
        console.error('Expected an array from the API response');
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* banner */}
      <div className="headbanner">
        <img src="./src/assets/images/banner.png" alt="Banner" />
        <h1>Redemption Shop</h1>
      </div>

      {/* balance */}
      <div className='balance'>
        <h1>Your balance:</h1>
        <h1><span className='total'>150</span> leaves</h1> {/* link w backend and user acc */}
        <p>View leaves summary</p>
      </div>

      {/* divider */}
      <hr className="divider" />

      {/* shop */}
      <div className='shop'>
        <h1>Shop:</h1>
        <div className='products'>
          {products.map(product => (
            <div key={product.id} className='product-item'>
              <h2>{product.prodName}</h2>
              <img src={`http://localhost:3001/eco/product-images/${product.prodimg}`} alt={product.prodName} className='product-image' />
              <p>Leaves: {product.leaves}</p>
              {/* Use Link to pass product ID as URL parameter */}
              <Link to={`/redeemform/${product.id}`} className='redeembutton'>Redeem</Link>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default RedemptionShop;
