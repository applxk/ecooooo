import React from 'react';
import './reward.css';
import Navbar from './Navbar';
import './Navbar.css';
import Footer from './Footer';
import './Footer.css';

function Rewards() {
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
        <p>Earn leaves and exchange them for rewards! It takes less than 2 minutes to create a account. Get 5 points for free once you sign up with us!</p>
        <button className='signupbutton'><a href='/redemptionshop'>Sign up now!</a></button>
      </div>

      {/* divider */}
      <hr className="divider" />

      {/* steps */}
      <div className='steps'>
        <h1>How does it works?</h1>
      </div>

      {/* rewards */}
      <div className='rewards'>
        <h1>Discover your eco-friendly haven with us.</h1>
        <h1>Use Leaves for sustainable rewards and nurture the environment.</h1>
        <button className='redeempagebutton'><a href='/redemptionshop'>Redeem Page</a></button>
        <p>*Find more rewards at our redeem page</p>
      </div>

      {/* greenreward2 */}
      <div className='greenreward2'>
        <h1>Green rewards</h1>
        <p>Earn leaves and exchange them for rewards! It takes less than 2 minutes to create a account. Get 5 points for free once you sign up with us!</p>
        <button className='signupbutton'><a href='/redemptionshop'>Sign up now!</a></button>
        <p className='qn'>Any questions? Check out our <a href='/faq'>FAQ</a> here</p>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Rewards;
