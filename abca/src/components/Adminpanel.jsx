
// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
// import Cardsdata from './CardsData';
// import Cardsdata1 from './CardsData1';
// import Cardsdata2 from './CardsData2';
// const AdminPanel = () => {
//     const [customers, setCustomers] = useState([]);

//     // Fetch customers from localStorage
//     useEffect(() => {
//         const storedCustomers = JSON.parse(localStorage.getItem('customers')) || [];
//         setCustomers(storedCustomers);
//     }, []);

//     // Calculate Data
//     const totalItems = Cardsdata.length;
//     const totalCustomers = customers.length;
//     const totalPrice = Cardsdata.reduce((acc, item) => acc + item.price, 0);

//     const totalItems1 = Cardsdata1.length;
//     const totalCustomers1 = customers.length;
//     const totalPrice1 = Cardsdata1.reduce((acc, item) => acc + item.price, 0);

//     const totalItems2 = Cardsdata2.length;
//     const totalCustomers2 = customers.length;
//     const totalPrice2 = Cardsdata2.reduce((acc, item) => acc + item.price, 0);

//     const price=totalPrice+totalPrice1+totalPrice2
//     const item=totalItems+totalItems1+totalItems2
//     // Data for Pie Chart
//     const pieData = [
//         { name: 'Items', value: item},
//         { name: 'Customers', value: totalCustomers },
//         { name: 'Total Price (K)', value: price * 0.001 }
//     ];

//     // Colors for Pie Chart
//     const COLORS = ['#ff5db6', 'rgba(149, 0, 255, 0.99)','#4bc0c0'];

//     // Data for Bar Chart
//     const barData = [
//         { name: 'Items', count: item },
//         { name:'user', count: totalCustomers },
//         // { name: 'Total Price', count: price}
//     ];

//     return (
//         <Container fluid>
//             <Row>
//                 {/* Sidebar */}
//                 <Col md={2} className="text-light min-vh-100" style={{ background: 'rgba(40, 128, 138, 0.99)' }}>
//                     <h4 className="mt-3">SHOP</h4>
//                     <ul className="nav flex-column">
//                         <li className="nav-item">
//                             <Link to="#" className="nav-link text-light">Dashboard</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link to="#" className="nav-link text-light">Items</Link>
//                         </li>
//                         <li className="nav-item">
//                             <Link to="#" className="nav-link text-light">Customers</Link>
//                         </li>
//                     </ul>
//                 </Col>

//                 {/* Main Content */}
//                 <Col md={10} className="p-4">
//                     <h2 style={{ color: 'rgba(53, 145, 140, 0.55)' }} cll>Dashboard</h2>

//                     <Row>
//                         <Col md={6}>
//                             <Card className="mb-3" style={{ background: 'rgba(31, 209, 182, 0.99)' }}>
//                                 <Card.Body className="text-light">
//                                     <Card.Title>Items</Card.Title>
//                                     <Card.Text>{item}</Card.Text>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                         <Col md={6}>
//                             <Card className="mb-3" style={{ background: 'rgba(31, 209, 182, 0.99)' }}>
//                                 <Card.Body className="text-light">
//                                     <Card.Title>Customers</Card.Title>
//                                     <Card.Text>{totalCustomers}</Card.Text>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     </Row>

//                     <Row>
//                         <Col md={6}>
//                             <Card className="mb-3" style={{ background: 'rgba(31, 209, 182, 0.99)' }}>
//                                 <Card.Body className="text-light">
//                                     <Card.Title>Total Price</Card.Title>
//                                     <Card.Text>{price}</Card.Text>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                         <Col md={6}>
//                             <Card className="mb-3" style={{ background: 'rgba(31, 209, 182, 0.99)' }}>
//                                 <Card.Body className="text-light">
//                                     <Card.Title>Category</Card.Title>
//                                     <Card.Text>ALL</Card.Text>
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     </Row>
                

//                     {/* Charts Section */}
//                     <Row>
//                         {/* Pie Chart */}
//                         <Col md={6}>
//                             <Card className="p-3">
//                                 <h5>Data Distribution</h5>
//                                 <ResponsiveContainer width="100%" height={300}>
//                                     <PieChart>
//                                         <Pie data={pieData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
//                                             {pieData.map((entry, index) => (
//                                                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                                             ))}
//                                         </Pie>
//                                         <Tooltip />
//                                         <Legend />
//                                     </PieChart>
//                                 </ResponsiveContainer>
//                             </Card>
//                         </Col>

//                         {/* Horizontal Bar Chart */}
//                         <Col md={6}>
//                             <Card className="p-3">
//                                 <h5>Comparison Data</h5>
//                                 <ResponsiveContainer width="100%" height={300}>
//                                     <BarChart layout="vertical" data={barData}>
//                                         <CartesianGrid strokeDasharray="3 3"/>
//                                         <XAxis type="number" />
//                                         <YAxis dataKey="name" type="category" />
//                                         <Tooltip />
//                                         <Legend />
//                                         <Bar dataKey="count" fill="rgba(31, 209, 87, 0.99)" barSize={40} />
//                                     </BarChart>
//                                 </ResponsiveContainer>
//                             </Card>
//                         </Col>
//                     </Row>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default AdminPanel;


import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';
import Cardsdata from './CardsData';
import Cardsdata1 from './CardsData1';
import Cardsdata2 from './CardsData2';

    const AdminPanel = () => {
        const [customers, setCustomers] = useState([]);
        // const [items, setItems] = useState([]);
        const [order, setOrder] = useState([]);
        const [book, setBook] = useState([]);
        // Fetch customers from MongoDB
        useEffect(() => {
            axios.get('http://localhost:5000/api/adminData')
                .then(response => {
                    setCustomers(response.data.userCount);
                    // setItems(response.data.cartcount)
                    setOrder(response.data.total)
                    setBook(response.data.bookcount)
                })
                .catch(error => {
                    console.error("Error fetching customers:", error);
                });
        }, []);


        // Calculate Data
        const total = Cardsdata.length;
        const total1 = Cardsdata1.length;
        const total2 = Cardsdata2.length;
        const totalItems=total+total1+total2
        const totalCustomers = customers;
        const totalPrice = order;
        const totalBooking = book;
    // const totalPrice = [...Cardsdata, ...Cardsdata1, ...Cardsdata2].reduce((acc, item) => acc + item.price, 0);

    // Data for Pie Chart
    const pieData = [
        { name: 'Items', value: totalItems*0.15 },  
        { name: 'Customers', value: totalCustomers },
        { name: 'Booking', value: totalBooking },
        { name: 'Revenue (K)', value: totalPrice * 0.0001 }
    ];

    // Colors for Pie Chart
    const COLORS = ['rgba(151, 37, 115, 0.99)', 'rgba(150, 235, 22, 0.99)', 'rgba(108, 98, 159, 0.99)','rgba(16, 236, 148, 0.99)'];

    // Data for Bar Chart
    const barData = [
        { name: 'Items', count: totalItems },
        { name: 'users', count: totalCustomers },
        { name: 'Book', count: totalBooking },
    ];

    return (
        <Container fluid>
            <Row>
                {/* Sidebar */}
                <Col md={2} className="text-light min-vh-100" style={{ background: 'rgba(40, 128, 138, 0.99)' }}>
                    <h4 className="mt-3">SHOP</h4>
                    <ul className="nav flex-column">
                        <li className="nav-item"><Link to="#" className="nav-link text-light">Items</Link></li>
                        <li className="nav-item"><Link to="#" className="nav-link text-light">Customers</Link></li>
                        <li className="nav-item"><Link to="#" className="nav-link text-light">Revenue</Link></li>
                        <li className="nav-item"><Link to="#" className="nav-link text-light">Booking</Link></li>
                    </ul>
                </Col>

                {/* Main Content */}
                <Col md={10} className="p-4">
                    <h2 style={{ color: 'rgba(53, 145, 140, 0.55)' }}>Dashboard</h2>

                    <Row>
                        
                        <Col md={6}><Card className="mb-3" style={{ background: 'rgba(31, 209, 182, 0.99)' }}><Card.Body className="text-light"><Card.Title>Items</Card.Title><Card.Text>{}</Card.Text>{totalItems}</Card.Body></Card></Col>
                        <Col md={6}><Card className="mb-3" style={{ background: 'rgba(31, 209, 182, 0.99)' }}><Card.Body className="text-light"><Card.Title>Customers</Card.Title><Card.Text>{totalCustomers}</Card.Text></Card.Body></Card></Col>
                    </Row>

                    <Row>
                        <Col md={6}><Card className="mb-3" style={{ background: 'rgba(31, 209, 182, 0.99)' }}><Card.Body className="text-light"><Card.Title>₹ Revenue</Card.Title><Card.Text>{totalPrice}</Card.Text></Card.Body></Card></Col>
                        <Col md={6}><Card className="mb-3" style={{ background: 'rgba(31, 209, 182, 0.99)' }}><Card.Body className="text-light"><Card.Title>Booking</Card.Title><Card.Text>{totalBooking}</Card.Text></Card.Body></Card></Col>
                    </Row>

                    {/* Charts Section */}
                    <Row>
                        {/* Pie Chart */}
                        <Col md={6}><Card className="p-3"><h5>Data Distribution</h5><ResponsiveContainer width="100%" height={300}><PieChart><Pie data={pieData} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">{pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />))}</Pie><Tooltip /><Legend /></PieChart></ResponsiveContainer></Card></Col>

                        {/* Horizontal Bar Chart */}
                        <Col md={6}><Card className="p-3"><h5>Comparison Data</h5><ResponsiveContainer width="100%" height={300}><BarChart layout="vertical" data={barData}><CartesianGrid strokeDasharray="3 3"/><XAxis type="number" /><YAxis dataKey="name" type="category" /><Tooltip /><Legend /><Bar dataKey="count" fill="rgba(31, 209, 87, 0.99)" barSize={40} /></BarChart></ResponsiveContainer></Card></Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default AdminPanel;
