import React, { useState } from 'react';
import { Card, Carousel, Button, Container, Row, Col, Nav, Tab } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { ADD, REMOVE } from '../redux/actions/action';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cardsdata from './CardsData';
import Cardsdata1 from './CardsData1';
import Cardsdata2 from './CardsData2';
import axios from 'axios';
import "./style.css";

const Cards = () => {
    const [data] = useState(Cardsdata);
    const dispatch = useDispatch();

    const [data1] = useState(Cardsdata1);
    const dispatch1 = useDispatch();

    const [data2] = useState(Cardsdata2);
    const dispatch2 = useDispatch();

    const [key, setKey] = useState('menu');
    const cartItems = useSelector((state) => state?.cart || []);
    
    const userId = "some_user_id"; // Replace with the actual user ID if logged in

    // Function to add items to cart and save to MongoDB
    const send = async (e) => {
        try {
            // Send data to the backend
            const response = await axios.post("http://localhost:5000/api/cart", {
                productId: e.id,
                name: e.rname,
                price: e.price,
                quantity: 1,
                image: e.imgdata,
                userId: userId
            });

            if (response.data.success) {
                dispatch(ADD(e)); // Update Redux state
                toast.success('Added to Cart', {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch (error) {
            toast.error('Error adding item to cart!', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    const send1 = async (e1) => {
        try {
            const response = await axios.post("http://localhost:5000/api/cart", {
                productId: e1.id,
                name: e1.rname,
                price: e1.price,
                quantity: 1,
                image: e1.imgdata,
                userId: userId
            });

            if (response.data.success) {
                dispatch1(ADD(e1)); // Update Redux state
                toast.success('Added to Cart', {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch (error) {
            toast.error('Error adding item to cart!', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    const send2 = async (e2) => {
        try {
            const response = await axios.post("http://localhost:5000/api/cart", {
                productId: e2.id,
                name: e2.rname,
                price: e2.price,
                quantity: 1,
                image: e2.imgdata,
                userId: userId
            });

            if (response.data.success) {
                dispatch2(ADD(e2)); // Update Redux state
                toast.success('Added to Cart', {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }
        } catch (error) {
            toast.error('Error adding item to cart!', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    return (
        <div className='container mt-3 mb-5 flex'>
            <h2 className='text-center' style={{ margin: '0px 100px 40px 100px' }}>
                🍽️ Our Special Menu
            </h2>

            {/* Image Carousel */}
            <Carousel style={{ maxWidth: '1000px', margin: 'auto', borderRadius: '15px', overflow: 'hidden' }}>
                {Cardsdata.slice(0, 3).map((item, index) => (
                    <Carousel.Item key={index}>
                        <img className='d-block w-100' src={item.imgdata} alt={item.rname} style={{ height: '450px', objectFit: 'cover', borderRadius: '15px' }} />
                        <Carousel.Caption>
                            <h5 style={{ fontSize: '30px', fontWeight: 'bold', padding: '10px', borderRadius: '10px' }}>
                                {item.rname}
                            </h5>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>

            {/* Tab Navigation */}
            <Tab.Container activeKey={key} onSelect={(k) => setKey(k)}>
                <Nav variant="tabs" className="justify-content-center gap-4 mt-4">
                    <Nav.Item>
                        <Nav.Link eventKey="menu" className="custom-tab" style={{color:'rgba(40, 128, 138, 0.99)'}}>
                            🍽️ Menu
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="breakfast" className="custom-tab" style={{color:'rgba(40, 128, 138, 0.99)'}}>
                            🥞 Breakfast
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="drinks" className="custom-tab" style={{color:'rgba(40, 128, 138, 0.99)'}}>
                            ☕🍹Drinks &🍦Ice Cream 
                        </Nav.Link>
                    </Nav.Item>
                </Nav>

                {/* Tab Content */}
                <Tab.Content>
                    {/* Menu Section */}
                    <Tab.Pane eventKey="menu">
                        <div className="row d-flex justify-content-center align-items-center gap-3 mb-5">
                            {data.map((element) => (
                                <Card key={element.id} style={{ width: '18rem' }} className="mx-2 mt-4 card_style">
                                    <Card.Img variant="top" src={element.imgdata} className="card-img-top mt-2" style={{ height: "12rem" }} />
                                    <Card.Body>
                                        <Card.Title style={{color:'rgba(40, 128, 138, 0.99)'}}>{element.rname}</Card.Title>
                                        <Card.Text style={{color:'rgba(40, 128, 138, 0.99)'}}>Price : ₹ {element.price}</Card.Text>
                                        <div className="button_div">
                                            <Button variant="danger" onClick={() => send(element)} className='col-lg-12'>
                                                🛒 Add to Cart
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    </Tab.Pane>

                    {/* Breakfast Section */}
                    <Tab.Pane eventKey="breakfast">
                        <div className="row d-flex justify-content-center align-items-center gap-3">
                            {data1.map((ele) => (
                                <Card key={ele.id} style={{ width: '18rem' }} className="mx-2 mt-4 card_style">
                                    <Card.Img variant="top" src={ele.imgdata} className="card-img-top mt-2" style={{ height: "12rem" }} />
                                    <Card.Body>
                                        <Card.Title style={{color:'rgba(40, 128, 138, 0.99)'}}>{ele.rname}</Card.Title>
                                        <Card.Text style={{color:'rgba(40, 128, 138, 0.99)'}}>Price : ₹ {ele.price}</Card.Text>
                                        <div className="button_div">
                                            <Button variant="danger" onClick={() => send1(ele)} className='col-lg-12'>
                                                🛒 Add to Cart
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    </Tab.Pane>

                    {/* Drinks & Ice Cream Section */}
                    <Tab.Pane eventKey="drinks">
                        <div className="row d-flex justify-content-center align-items-center gap-3">
                            {data2.map((elem) => (
                                <Card key={elem.id} style={{ width: '18rem' }} className="mx-2 mt-4 card_style">
                                    <Card.Img variant="top" src={elem.imgdata} className="card-img-top mt-2" style={{ height: "12rem" }} />
                                    <Card.Body>
                                        <Card.Title style={{color:'rgba(40, 128, 138, 0.99)'}}>{elem.rname}</Card.Title>
                                        <Card.Text style={{color:'rgba(40, 128, 138, 0.99)'}}>Price : ₹ {elem.price}</Card.Text>
                                        <div className="button_div">
                                            <Button variant="danger" onClick={() => send2(elem)} className='col-lg-12'>
                                                🛒 Add to Cart
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))}
                        </div>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>

            {/* Footer */}
            <footer className="text-center py-2 text-light fixed-bottom" style={{ background: 'rgba(40, 128, 138, 0.99)' }}>
                <p>© 2025 Urban Bites. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default Cards;
