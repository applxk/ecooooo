import React, { useState, useEffect } from 'react';
import '../../assets/styles/redeemform.css';
import Navbar from '../../components/Navbar';
import Footer from '../../components/footer';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FormControl, Input } from '@mui/material';
import { styled } from '@mui/system';
import * as Yup from 'yup';

const Label = styled('label')({
    marginLeft: '100px',
    marginBottom: '-10px',
    fontSize: '16px',
    fontWeight: 'bold',
});

const StyledInput = styled(Input)({
    marginLeft: '90px',
    padding: '10px',
    marginBottom: '8px',
    width: '100%',
    '&::before': {
        content: 'none',
    },
});

const validationSchema = Yup.object({
    name: Yup.string()
        .required('Name is required')
        .matches(/^[A-Za-z ]*$/, 'Name should only contain alphabetic characters and spaces'),
    phoneNumber: Yup.string()
        .required('Phone number is required')
        .matches(/^\d{9}$/, 'Phone number must be exactly 9 digits'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required')
        .matches(/@/, 'Email must contain "@"'), // Simple check for presence of @
});

function RewardForm() {
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        if (isSubmitted) {
            // Redirect to /successcollect after submission
            setTimeout(() => {
                window.location.href = '/successcollect';
            }
    )}
    }, [isSubmitted]);

    return (
        <div className='rewardform'>
            {/* Navbar */}
            <Navbar />

            {/* banner */}
            <div className="headbanner">
                <img src="../src/assets/images/banner.png" alt="Banner" />
                <h1>Redeem Form</h1>
            </div>

            {/* back */}
            <div className="back">
                <img src="../src/assets/images/icons/back.png" alt="back" />
                <p><a href='/redemptionshop'>back to redemption shop</a></p>
            </div>

            {/* form */}
            <div className="form-section">
                <h2 className='info'>Information</h2>
                <Formik
                    initialValues={{ name: '', phoneNumber: '', email: '' }}
                    validationSchema={validationSchema}
                    onSubmit={(values, { setSubmitting }) => {
                        // Simulate async submission
                        setTimeout(() => {
                            setIsSubmitted(true); // Set submitted state to true
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({ errors }) => (
                        <Form>

                            {/* name */}
                            <FormControl fullWidth>
                                <Label>Name <span className='asterisk'>*</span></Label>
                                <Field name="name" as={StyledInput} placeholder="Name" />
                                <ErrorMessage name="name" component="div" className="error-message" />
                            </FormControl>

                            {/* phone number */}
                            <FormControl fullWidth>
                                <Label>Phone Number <span className='asterisk'>*</span></Label>
                                <Field name="phoneNumber" as={StyledInput} placeholder="Phone number" />
                                <ErrorMessage name="phoneNumber" component="div" className="error-message" />
                            </FormControl>

                            {/* email */}
                            <FormControl fullWidth>
                                <Label>Email <span className='asterisk'>*</span></Label>
                                <Field name="email" as={StyledInput} placeholder="Email" />
                                <ErrorMessage name="email" component="div" className="error-message" />
                            </FormControl>

                            {/* detail */}
                            <div className='detail'>
                                <h2>Please remember the collection details</h2>
                                <p>Potong Pasir Community Club</p>
                                <p>6 Potong Pasir Ave 2, Singapore 358361</p>
                                <p>Monday - Friday: <span className='time'>11:00am - 8:00pm</span></p>
                                <p>Saturday & Sunday: <span className='time'>12:00pm - 4:00pm</span></p>
                                <p className='extra'>*please collect within a week</p>
                            </div>

                            {/* submit */}
                            <button type="submit" className='submitbutton'>
                                Redeem now
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default RewardForm;
