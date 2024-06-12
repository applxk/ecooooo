import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

export default function App() {
    return (
        <MDBFooter bgColor='light' className='footer-container'>
            <MDBContainer className='mt-5'>
                <MDBRow className='mt-3 footer-content'>
                    <MDBCol md='3' className='col1'>
                        <h6 className='section-title'>Overview</h6>
                        <a href='#!' className='text-reset'>
                            About Us
                        </a>
                        <a href='#!' className='text-reset'>
                            Workshops
                        </a>
                        <a href='#!' className='text-reset'>
                            Events
                        </a>
                        <a href='/reward' className='text-reset'>
                            Rewards
                        </a>
                        <a href='#!' className='text-reset'>
                            Contact Us
                        </a>
                    </MDBCol>

                    <MDBCol md='3' className='col2'>
                        <h6 className='section-title'>Help & FAQs</h6>
                        <a href='/faq' className='text-reset'>
                            FAQs
                        </a>
                        <a href='#!' className='text-reset'>
                            Payment methods
                        </a>
                        <a href='#!' className='text-reset'>
                            Refunds
                        </a>
                        <a href='#!' className='text-reset'>
                            Terms & Conditions
                        </a>
                    </MDBCol>

                    <MDBCol md='6' className='col3'>
                        <h6 className='section-title'>Subscribe to learn more:</h6>
                        <p className='contact'>
                            Be the first to get the latest news of events and workshop from us!
                        </p>

                        <div className="newsletter-form">
                            <form>
                                <div className="form-group">
                                    <input type="email" className="form-control" id="newsletter-email" aria-describedby="emailHelp" placeholder="Enter email here" />
                                    <button type="submit" className="btn btn-primary">Subscribe</button>
                                </div>
                            </form>
                        </div>

                        <h6 className='section-title'>Connect with us!</h6>
                        <p className='social'>
                            <a href='#'><img src='./src/assets/images/facebook.png' alt='facebook'></img></a>
                            <a href='#'><img src='./src/assets/images/instagram.png' alt='instagram'></img></a>
                        </p>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <div className='copyright-text'>
                © 2024 EcoHaven. All rights Reserved
            </div>
        </MDBFooter>
    );
}

