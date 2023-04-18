import React from 'react';
import './Contact.scss';

const Contact = () => {
  return (
    <section className="contact">
      <div className="container">
        <h2>Contact Us</h2>
        <p>If you have any questions or need assistance, please feel free to contact us. Our team is always here to help you with your inquiries and provide support.</p>
        
        <div className="contact-info">
          <div className="contact-item">
            <h3>Email</h3>
            <p>info@scroll-mart.com</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
