import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function App() {
    return (
        <MDBFooter bgColor='light' className='footer-container'>

            <section className='footer-content'>
                <MDBContainer className='mt-5'>
                    <MDBRow className='mt-3'>

                        <MDBCol className='col2'>
                            <h6 className='section-title'>Overview</h6>
                            <ul className='footer-list'>
                                <li>
                                    <a href='#!' className='text-reset'>
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href='#!' className='text-reset'>
                                        Workshops
                                    </a>
                                </li>
                                <li>
                                    <a href='#!' className='text-reset'>
                                        Events
                                    </a>
                                </li>
                                <li>
                                    <a href='#!' className='text-reset'>
                                        Rewards
                                    </a>
                                </li>
                                <li>
                                    <a href='#!' className='text-reset'>
                                        Contact Us
                                    </a>
                                </li>
                            </ul>
                        </MDBCol>

                        <MDBCol className='col3'>
                            <h6 className='section-title'>Help & FAQs</h6>
                            <ul className='footer-list'>
                                <li>
                                    <a href='#!' className='text-reset'>
                                        FAQs
                                    </a>
                                </li>
                                <li>
                                    <a href='#!' className='text-reset'>
                                        Payment methods
                                    </a>
                                </li>
                                <li>
                                    <a href='#!' className='text-reset'>
                                        Refunds
                                    </a>
                                </li>
                                <li>
                                    <a href='#!' className='text-reset'>
                                        Terms & Conditions
                                    </a>
                                </li>
                            </ul>
                        </MDBCol>

                        <MDBCol className='col4'>
                            <h6 className='section-title'>Subscribe to learn more:</h6>
                            <p className='contact'>
                                Be the first to get the latest news of events and workshop from us!
                            </p>

                            {/* Newsletter Subscription Form */}
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
                                <a href='#'><img src='./images/facebook.png' alt='facebook'></img></a>
                                <a href='#'><img src='./images/instagram.png' alt='instagram'></img></a>
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className='copyright-text'>
                © 2024 EcoHaven. All rights Reserved
            </div>
        </MDBFooter>
    );
}
