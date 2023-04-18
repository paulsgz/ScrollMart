import React from 'react';
import './About.scss';

const About = () => {
  return (
    <section className="about">
      <div className="container">
        <h2>About ScrollMart</h2>
        <p>ScrollMart is a one-stop online shopping platform that offers a wide range of products across various categories, including electronics, fashion, health and beauty, home and garden, and more. We aim to provide our customers with an enjoyable shopping experience by offering high-quality products at competitive prices, along with exceptional customer service and support.</p>

        <h3>Our Vision</h3>
        <p>Our vision is to become the leading online shopping destination, empowering consumers to make informed decisions and discover new products that enhance their lives. We strive to provide a seamless and convenient shopping experience by continuously improving our platform and expanding our product offerings.</p>

        <h3>Our Values</h3>
        <ul>
          <li><strong>Customer Focus:</strong> We put our customers at the heart of everything we do, ensuring that their needs and expectations are met.</li>
          <li><strong>Innovation:</strong> We believe in embracing change and constantly seeking new ways to improve and grow our business.</li>
          <li><strong>Integrity:</strong> We are committed to acting ethically and responsibly in all aspects of our business.</li>
          <li><strong>Collaboration:</strong> We foster a collaborative environment that encourages teamwork, open communication, and mutual respect.</li>
        </ul>
      </div>
    </section>
  );
};

export default About;
