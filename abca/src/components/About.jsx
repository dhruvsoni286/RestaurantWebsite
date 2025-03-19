
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "./style.css"; 

const About = () => {
  return (
    <div>
      
      <Container className="section py-5 text-center">
        <Row>
          <Col md={6} className="d-flex align-items-center">
            <div>
              <h2 className="section-title">Our Story</h2>
              <p className="section-text">
                Founded in 2020, Urban Bites is a culinary haven for food lovers. We take pride in creating exquisite
                dishes made from the freshest ingredients, bringing flavors from around the world to your plate.
              </p>
            </div>
          </Col>
          <Col md={6}>
            <img src="rejs.jpg" alt="Our Story" className="img-fluid rounded shadow-lg" />
          </Col>
        </Row>
      </Container>

     
      <Container className="section py-5 text-center bg-light">
        <Row>
          <Col md={6}>
            <img src="res.jpg" alt="Our Mission" className="img-fluid rounded shadow-lg" />
          </Col>
          <Col md={6} className="d-flex align-items-center">
            <div>
              <h2 className="section-title">Our Mission</h2>
              <p className="section-text">
                Our mission is to serve delicious, high-quality meals in a welcoming and cozy atmosphere. We strive to
                make every dining experience memorable with exceptional service and unique flavors.
              </p>
            </div>
          </Col>
        </Row>
      </Container>

     
      <Container className="section py-5 text-center">
        <h2 className="section-title">Contact Us</h2>
        <p className="section-text">
          📍 Address: 123 Food Street, Gourmet City <br />
          📞 Phone: +91 8780896761<br />
          ✉️ Email: contact@urbanbites.com
        </p>
        {/* <Button  size="lg" className="mt-3">Get in Touch</Button> */}
      </Container>

      
      <footer className="text-center py-2  text-white fixed-bottom"  style={{ background:'rgba(40, 128, 138, 0.99)'}}>
        <p>&copy; 2025 Urban Bites | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default About;
