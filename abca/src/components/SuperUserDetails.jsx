import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Table, Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/actions/action';        
import { toast } from 'react-toastify';

const SuperUserDetails = () => {
    const cartData = useSelector((state) => state.cartreducer.carts);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    // State to store the customername
    const [customername, setcustomername] = useState('');

    const calculateTotal = () => {
        return cartData.reduce((acc, item) => acc + item.price * item.qnty, 0);
    };

    const handlePlaceOrder = async () => {
        if (!customername) {
            toast.error("Please enter your name before proceeding.", {
                position: 'top-center',
                autoClose: 2000,
            });
            return;
        }

        const grandTotal = calculateTotal();

        try {
            const orderData = {
                customername,
                grandTotal,
                cartItems: cartData.map((item) => ({
                    productId: item.id,
                    name: item.rname,
                    price: item.price,
                    quantity: item.qnty,
                    image: item.imgdata,
                    userId: 'USER_ID', // Replace with actual user ID from auth system
                })),
            };

            const response = await fetch('http://localhost:5000/api/saveOrder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData),
            });

            if (response.ok) {
                dispatch(clearCart());
                navigate('/');
                toast.success('Payment Successful!', {
                    position: 'top-center',
                    autoClose: 2000,
                });
            } else {
                toast.error('Order failed, please try again.', {
                    position: 'top-center',
                    autoClose: 2000,
                });
            }
        } catch (error) {
            toast.error('Something went wrong. Please try again.', {
                position: 'top-center',
                autoClose: 2000,
            });
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="text-center" style={{ color: 'rgba(216, 88, 122, 0.99)' }}>Bill Summary</h2>
            {cartData.length > 0 ? (
                <Table striped bordered hover variant="light">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartData.map((item, index) => (
                            <tr key={item.id}>
                                <td>{index + 1}</td>
                                <td><img src={item.imgdata} alt={item.rname} style={{ width: '50px', height: '50px' }} /></td>
                                <td>{item.rname}</td>
                                <td>₹{item.price}</td>
                                <td>{item.qnty}</td>
                                <td>₹{item.price * item.qnty}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            ) : (
                <h4 className="text-center text-danger">Your cart is empty</h4>
            )}

            <h4 className="text-end mt-3">Grand Total: ₹{calculateTotal()}</h4>

            {/* Input for customername */}
            <Form.Group className="mt-3 d-flex align-items-center">
                <Form.Label className="me-2 fw-bold" style={{ minWidth: '140px', color: '#287f8a' }}>Enter Your Name:</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    value={customername}
                    onChange={(e) => setcustomername(e.target.value)}
                    className="shadow-sm rounded-pill px-3"
        style={{ maxWidth: '300px', border: '1px solid #287f8a', outline: 'none' }}
                />
            </Form.Group>

            {/* Payment Button */}
            <Button className="mt-3 text-light" variant="" onClick={handlePlaceOrder} style={{background:'rgba(40, 128, 138, 0.99)'}}>
                Payment
            </Button>
        </Container>
    );
};

export default SuperUserDetails;
