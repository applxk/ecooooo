import React, { useState, useEffect } from 'react';
import '../../assets/styles/redemptionshop.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';
import axios from 'axios';

function RedemptionShop() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:3001/eco/product-detail');
      if (Array.isArray(response.data)) {
        setProducts(response.data);
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
              <p>Leaves: {product.leaves}</p>
              <button className='redeembutton'><a href='/redeemform'>Redeem</a></button>
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
