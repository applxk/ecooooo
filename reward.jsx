import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/styles/reward.css';

import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';

function Rewards() {
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/eco/product-detail');
        if (Array.isArray(response.data)) {
          // Sort products by creation date (assuming there is a createdAt field)
          const sortedProducts = response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          setLatestProducts(sortedProducts.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching latest products:', error);
      }
    };

    fetchLatestProducts();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* banner */}
      <div className="headbanner">
        <img src="./src/assets/images/banner.png" alt="Banner" />
        <h1>Rewards</h1>
      </div>

      {/* greenreward */}
      <div className='greenreward'>
        <h1>Green rewards</h1>
        <p>Earn leaves and exchange them for rewards! It takes less than 2 minutes to create a account. Sign up with us now!</p>
        <button className='signupbutton'><a href='/redemptionshop'>Sign up now!</a></button> {/* change link afterwards */}
      </div>

      {/* divider */}
      <hr className="divider" />

      {/* steps */}
      <div className='stepsheader'>
        <h1>How does it work?</h1>
        <div className='steps'>
          <div className='step'>
            <img src='../src/assets/images/signup.png' alt='signup' />
            <div className='desc'>
              <p><b>Sign up for free</b></p>
              <p>Simply click here to create an account</p>
            </div>
          </div>

          <div className='step'>
            <img src='../src/assets/images/leaves.png' alt='leaves' />
            <div className='desc'>
              <p><b>Earn points</b></p>
              <p>Get 1 leaf per event that you have signed up for & attended</p>
            </div>
          </div>

          <div className='step'>
            <img src='../src/assets/images/prize.png' alt='prize' />
            <div className='desc'>
              <p><b>Get rewarded</b></p>
              <p>Use your leaves to redeem rewards</p>
            </div>
          </div>
        </div>
      </div>

      {/* rewards */}
      <div className='rewards'>
        <h1>Discover your eco-friendly haven with us.</h1>
        <h1>Use Leaves for sustainable rewards and nurture the environment.</h1>

        <div className='products'>
          {latestProducts.map((product) => (
            <div key={product.id} className='product-item'>
              <h2>{product.prodName}</h2>
              <img src={`http://localhost:3001/eco/product-images/${product.prodimg}`} alt={product.prodName} />
              <p><b>{product.leaves}</b> Leaves</p>
            </div>
          ))}
        </div>

        <button className='redeempagebutton'><a href='/redemptionshop'>Redemption Shop</a></button>
        <p>*Find more rewards at our redemption shop</p>
      </div>

      {/* greenreward2 */}
      <div className='greenreward2'>
        <h1>Green rewards</h1>
        <p>Earn leaves and exchange them for rewards! It takes less than 2 minutes to create a account. Sign up with us now!</p>
        <button className='signupbutton'><a href='/redemptionshop'>Sign up now!</a></button> {/* change link afterwards */}
        <p className='qn'>Any questions? Check out our <a href='/faq'>FAQ</a> here</p>
      </div>

      {/* Footer */}
      <Footer />

      {/* backend test nav */}
      <ul>
        <div>
          <li><a href="/rewardproduct">Reward Product</a></li>
        </div>
      </ul>

    </div>
  );
}

export default Rewards;
