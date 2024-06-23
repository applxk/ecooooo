import React, { useEffect, useState } from 'react';
import '../../assets/styles/successcollect.css';

import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';

function Rewards() {
  const [collectionId, setCollectionId] = useState('');

  useEffect(() => {
    const generateCollectionId = () => {
      return Math.floor(100000 + Math.random() * 900000); // Generate a random 6-digit number
    };

    setCollectionId(generateCollectionId());
  }, []);

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* banner */}
      <div className="headbanner">
        <img src="./src/assets/images/banner.png" alt="Banner" />
        <h1>Thank you!</h1>
      </div>

      {/* collection id */}
      <div className='collectionid'>
        <h1>Collection ID</h1>
        <h1 className='idnumber'>{collectionId}</h1>
      </div>

      {/* collection detail */}
      <div className='collectiondetail'>
        <h2>Please remember the collection details</h2>
        <p>Potong Pasir Community Club</p>
        <p>6 Potong Pasir Ave 2, Singapore 358361</p>
        <p>Monday - Friday: <span className='time'>11:00am - 8:00pm</span></p>
        <p>Saturday & Sunday: <span className='time'>12:00pm - 4:00pm</span></p>
        <p className='extra'>*please collect within a week</p>

        <button className='backtohome'><a href='/home'>Back to home</a></button> {/* edit link to go home */}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Rewards;
