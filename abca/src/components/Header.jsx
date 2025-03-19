
import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Badge from '@mui/material/Badge';
import Nav from 'react-bootstrap/Nav';
import Menu from '@mui/material/Menu';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // 
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DLT, ADD, REMOVE } from '../redux/actions/action';
import Cardsdata from './CardsData';
import Cardsdata1 from './CardsData1';
import Cardsdata2 from './CardsData2';
// import Signup from './Signup';
import { clearCart } from '../redux/actions/action';
import { logOut } from "../redux/actions/authAction";
import {User} from 'lucide-react';
import {LogOut} from 'lucide-react';
import {Search} from 'lucide-react';
const Header = () => {
    const [price, setPrice] = useState(0);
    const getdata = useSelector((state) => state.cartreducer.carts);
    const dispatch = useDispatch();
    const dlt = (id)=>{
        dispatch(DLT(id))
    }
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch1 = useDispatch();

    

    const handleLogout = () => {
        dispatch1(logOut());
        toast.success('Logged out successfully!', {
            position: 'top-center',
            autoClose: 2000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
         }); 
    };
    const handleIncreaseQuantity = (item) => {
        dispatch(ADD(item));
    };
    const handleBackToHome = () => {
        dispatch(clearCart()); // Clear the cart
        navigate('/'); // Navigate to home
    };
    const handlePlacesub = () => {
            dispatch(clearCart()); 
            navigate('/');
            toast.success('Payment Succesfull!!', {
                position: 'top-center',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        // Navigate to the home page after order
        };
        const handleDecreaseQuantity = (item) => {
            if (item.qnty > 1) {
                dispatch(REMOVE(item));
            } else {
                dispatch(DLT(item.id));
            }
        };
        const send = (e) => {
                    dispatch(ADD(e));
                    toast.success('Added to Cart', {
                        position: 'top-center',
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                    });
                };

        const total = () => {
            let totalPrice = 0;
            getdata.forEach((ele) => {
                totalPrice += ele.price * ele.qnty;
            });
            setPrice(totalPrice);
        };
        useEffect(() => {
            total();
        }, [getdata]);

    // Search functionality
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);

    useEffect(() => {
        if (searchQuery) {
            const results = [...Cardsdata, ...Cardsdata1, ...Cardsdata2].filter((item) =>
                item.rname.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredItems(results);
        } else {
            setFilteredItems([]);
        }
    }, [searchQuery]);

   
    return (
        <>
            <Navbar bg="" variant="dark" style={{ height: "60px" }}>
                <Container>
                    <Nav className="">
                        <NavLink to="#" className="text-decoration-none text-light fw-bold p-3" style={{ fontSize: 20 }}>𝕌ℝ𝔹𝔸ℕ 𝔹𝕀𝕋𝔼𝕊</NavLink>
                        <NavLink to="/" className="text-decoration-none text-light fw-bold p-3" style={{ fontSize: 20 }}>ℍ𝕆𝕄𝔼</NavLink>
                        <NavLink to="/about" className="text-decoration-none text-light fw-bold p-3" style={{ fontSize: 20 }}>𝔸𝔹𝕆𝕌𝕋</NavLink>
                        <NavLink to="/book-table" className="text-decoration-none text-light fw-bold p-3" style={{ fontSize: 20 }}>𝔹𝕆𝕆𝕂</NavLink>
                        {/* <NavLink to="/signup" className="text-decoration-none text-light fw-bold p-3" style={{ fontSize: 20 }}>About</NavLink> */}
                    </Nav>
                    {/* Search Input */}
                    

                    <div className='d-flex align-items-center gap-4 '>
                     <div className="search-bar p-110 d-flex gap-2 ">
 
                     <div className="position-relative">
         <input
        type="text"
        placeholder="Search"
        className="form-control ps-2"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ }} // Ensures space for the icon
    />
    <Search
        size={25}
        className="text-secondary position-absolute"
        style={{ right: "10px", top: "50%", transform: "translateY(-50%)" }}
    />
</div>
                    {/* <Search  size={40} className='text-light text-transperent '/> */}
                    </div> 
                    <Badge badgeContent={getdata.length} color="primary" 
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}
                    >
                        <i className="fa-solid fa-cart-shopping text-light" style={{ fontSize: 25, cursor: "pointer" }}></i>
                    </Badge>
                    <Nav>
                    {isAuthenticated ? (
                    <button className="btn btn-transperent text-light" onClick={handleLogout}><b>Logout</b><LogOut size={30} className='text-light'/></button>
                ) : (
                    <>
                    {/* <NavLink to="/signup" className="btn bg-transparent text-white" >
                            <User  size={30} className='text-light'/>
                    </NavLink> */}

                         <NavLink to="/login" className="btn bg-transparent text-white">
                         <User  size={30} className='text-light'/>
                         </NavLink> 
                    </>
                )}
                    </Nav>
                    </div>
                    
                </Container>
            </Navbar>

            {/* Show search results in a grid */}
            {searchQuery && (
                <Container className="mt-3">
                    <h5 className="mb-3">Search Results for "{searchQuery}"</h5>
                    <Row className='gap-5'>
                        {filteredItems.length > 0 ? (
                            filteredItems.map((item) => (
                                    <Card key={item.id} style={{ width: '22rem' }} className="mx-2 mt-4 card_style">
                        <Card.Img variant="top" src={item.imgdata} className="card-img-top mt-3" style={{ height: "16rem" }} />
                        <Card.Body>
                            <Card.Title style={{color:'rgba(40, 128, 138, 0.99)'}}>{item.rname}</Card.Title>
                            <Card.Text style={{color:'rgba(40, 128, 138, 0.99)'}}>Price : ₹ {item.price}</Card.Text>

                            <div className="button_div">
                            <Button variant="danger" onClick={() => send(item)} className='col-lg-12'>
                                    🛒 Add to Cart
                            </Button>
                            </div>
                        </Card.Body>        
                    </Card>
                                            
                      ))
                        ) : (
                            <p>No Results Found</p>
                        )}
                    </Row>
                </Container>
            )}

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {getdata.length ? (
                    <div className='card_details' style={{ width: "24rem", padding: 10 }}>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Photo</th>
                                    <th>Details</th>
                                </tr>
                            </thead>
                            <tbody>
                                {getdata.map((e) => (
                                    <tr key={e.id}>
                                        <td>
                                            <img src={e.imgdata} style={{ width: "5rem", height: "5rem" }} alt="" />
                                        </td>
                                        <td>
                                            <p>{e.rname}</p>
                                            <p>Price: ₹{e.price}</p>
                                            <div className='d-flex align-items-center'>
                                                <button className='btn btn-sm btn-danger' onClick={() => handleDecreaseQuantity(e)}>-</button>
                                                <span className='mx-2'>{e.qnty}</span>
                                                <button className='btn btn-sm btn-success' onClick={() => handleIncreaseQuantity(e)}>+</button>
                                            </div>
                                            <br />
                                            <p style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => dispatch(DLT(e.id))}>
                                                <i className='fas fa-trash'></i>
                                            </p>
                                            <NavLink to={`/cart/${e.id}`} className='btn btn-primary btn-sm mt-2'>View Details</NavLink>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                        <p className='text-center'>Total: ₹ {price}</p>
                        <NavLink to="/superuser" className='btn btn-warning w-100 mt-2 bg-warning'>Order</NavLink>
                        <NavLink to="/" className='btn btn-warning w-100 mt-2 bg-warning' onClick={handleBackToHome}>Close</NavLink>
                    </div>
                ) : (
                    <div className='card_details d-flex justify-content-center align-items-center' style={{ width: "24rem", padding: 10, position: "relative" }}>
                        <i className='fas fa-close smallclose' onClick={handleClose} style={{ position: "absolute", top: 2, right: 20, fontSize: 23, cursor: "pointer" }}></i>
                        <p style={{ fontSize: 22 }}>Your cart is empty</p>
                        <img src="./cart.gif" alt="" className='emptycart_img' style={{ width: "5rem", padding: 10 }} />
                    </div>
                )}
            </Menu>
        </>
    )
}

export default Header









// import React, { useEffect, useState } from 'react';
// import Navbar from 'react-bootstrap/Navbar';
// import Container from 'react-bootstrap/Container';
// import Badge from '@mui/material/Badge';
// import Nav from 'react-bootstrap/Nav';
// import Menu from '@mui/material/Menu';
// import Table from 'react-bootstrap/Table';
// import Card from 'react-bootstrap/Card';
// import Row from 'react-bootstrap/Row';
// import Button from 'react-bootstrap/Button';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { DLT, ADD, REMOVE } from '../redux/actions/action';
// import Cardsdata from './CardsData';
// import Cardsdata1 from './CardsData1';
// import Cardsdata2 from './CardsData2';
// import { clearCart } from '../redux/actions/action';
// import { logOut } from "../redux/actions/authAction";
// import { User } from 'lucide-react';
// import { LogOut } from 'lucide-react';
// import { Search } from 'lucide-react';
// const Header = () => {
//     const [price, setPrice] = useState(0);
//     const getdata = useSelector((state) => state.cartreducer.carts);
//     const dispatch = useDispatch();
//     const cartData = useSelector((state) => state.cartreducer.carts);
//     const navigate = useNavigate();
//     const [anchorEl, setAnchorEl] = useState(null);
//     const open = Boolean(anchorEl);
//     const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//     const isAdmin = useSelector((state) => state.auth.isAdmin);
//     console.log(Cardsdata);
    
//     const handleClick = (event) => {
//         setAnchorEl(event.currentTarget);
//     };

//     const handleClose = () => {
//         setAnchorEl(null);
//     };

//     const handleLogout = () => {
//         dispatch(logOut());
//         toast.success('Logged out successfully!', {
//             position: 'top-center',
//             autoClose: 2000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//         });
//     };

//     const handleIncreaseQuantity = (item) => {
//         dispatch(ADD(item));
//     };

//     const handleBackToHome = () => {
//         toast.success('Order Placed!', {
//             position: 'top-center',
//             autoClose: 2000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//         });
//         dispatch(clearCart());
//         navigate('/');
//     };

//     const calculateTotal = () => {
//         return cartData.reduce((acc, item) => acc + item.price * item.qnty, 0);
//     };

//     const handlePlaceOrder = () => {
//         dispatch(clearCart());
//         const grandTotal = calculateTotal();
//     localStorage.setItem('lastOrderTotal', grandTotal);
//     window.dispatchEvent(new Event('orderPlaced'));
//         navigate('/');
//     };

//     const handleBack = () => {
//         navigate('/superuser');
//         dispatch(clearCart());
//     };

//     const handleBackTo = () => {
//         dispatch(clearCart());
//         navigate('/');
//     };

//     const handleDecreaseQuantity = (item) => {
//         if (item.qnty > 1) {
//             dispatch(REMOVE(item));
//         } else {
//             dispatch(DLT(item.id));
//         }
//     };
//     const dispatch1 = useDispatch();
//     const dispatch2 = useDispatch();
//     const send = (e) => {
//         dispatch(ADD(e));
//         toast.success('Added to Cart', {
//             position: 'top-center',
//             autoClose: 2000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//         });
//     };
   
//     const total = () => {
//         let totalPrice = 0;
//         getdata.forEach((ele) => {
//             totalPrice += ele.price * ele.qnty;
//         });
//         setPrice(totalPrice);
//     };

//     useEffect(() => {
//         total();
//     }, [getdata]);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [filteredItems, setFilteredItems] = useState([]);


//     useEffect(() => {
//         if (searchQuery) {
//             const results =  [...Cardsdata, ...Cardsdata1, ...Cardsdata2].filter((item) =>
//                 item.rname.toLowerCase().includes(searchQuery.toLowerCase())
//             );
//             setFilteredItems(results);
//         } else {
//             setFilteredItems([]);
//         }
//     }, [searchQuery]);
//     return (
//         <>
//             <Navbar bg="" variant="dark" style={{ height: "60px" }}>
//                 <Container>
//                     <Nav className="">
//                         <NavLink to="#" className="text-decoration-none text-light fw-bold p-3" style={{ fontSize: 20 }}>URBAN BITES</NavLink>
//                         <NavLink to="/" className="text-decoration-none text-light  p-3" style={{ fontSize: 20 }}>Home</NavLink>
//                         <NavLink to="/about" className="text-decoration-none text-light  p-3" style={{ fontSize: 20 }}>About</NavLink>
//                         {isAdmin && (
//                             <NavLink to="/admin" className="text-decoration-none text-light  p-3" style={{ fontSize: 20 }}>Admin Panel</NavLink>
//                         )}
//                     </Nav>

//                     <div className='d-flex align-items-center gap-4 '>
//                         <div className="search-bar p-10 d-flex gap-2 ">
//                             <div className="position-relative">
//                                 <input
//                                     type="text"
//                                     placeholder="Search"
//                                     className="form-control ps-2"
//                                     value={searchQuery}
//                                     onChange={(e) => setSearchQuery(e.target.value)}
//                                 />
//                                 <Search
//                                     size={25}
//                                     className="text-secondary position-absolute"
//                                     style={{ right: "10px", top: "50%", transform: "translateY(-50%)" }}
//                                 />
//                             </div>
//                         </div>
//                         <Badge badgeContent={getdata.length} color="primary"
//                             id="basic-button"
//                             aria-controls={open ? 'basic-menu' : undefined}
//                             aria-haspopup="true"
//                             aria-expanded={open ? 'true' : undefined}
//                             onClick={handleClick}
//                         >
//                             <i className="fa-solid fa-cart-shopping text-light" style={{ fontSize: 25, cursor: "pointer" }}></i>
//                         </Badge>
//                         <Nav>
//                             {isAuthenticated ? (
//                                 <button className="btn btn-transperent text-light" onClick={handleLogout}><b>Logout</b> <LogOut size={30} className='text-light' /></button>
//                             ) : (
//                                 <NavLink to="/login" className="btn bg-transparent text-white">
//                                     <User size={30} className='text-light' />
//                                 </NavLink>
//                             )}
//                         </Nav>
//                     </div>
//                 </Container>
//             </Navbar>

//             {searchQuery && (
//                 <Container className="mt-3">
//                     <h5 className="mb-3">Search Results for "{searchQuery}"</h5>
//                     <Row className='gap-5'>
//                         {filteredItems.length > 0 ? (
//                             filteredItems.map((item) => (
//                                 <Card key={item.id} style={{ width: '22rem' }} className="mx-2 mt-4 card_style">
//                                     <Card.Img variant="top" src={item.imgdata} className="card-img-top mt-3" style={{ height: "16rem" }} />
//                                     <Card.Body>
//                                         <Card.Title style={{ color: 'rgba(40, 128, 138, 0.99)' }}>{item.rname}</Card.Title>
//                                         <Card.Text style={{ color: 'rgba(40, 128, 138, 0.99)' }}>Price : ₹ {item.price}</Card.Text>
//                                         <div className="button_div">
//                                             <Button variant="danger" onClick={() => send(item)} className='col-lg-12'>
//                                                 🛒 Add to Cart
//                                             </Button>
//                                         </div>
//                                     </Card.Body>
//                                 </Card>
//                             ))
//                         ) : (
//                             <p>No results found</p>
//                         )}
//                     </Row>
                  
//                 </Container>
//             )}

//             <Menu
//                 id="basic-menu"
//                 anchorEl={anchorEl}
//                 open={open}
//                 onClose={handleClose}
//                 MenuListProps={{
//                     'aria-labelledby':'basic-button',
//                 }}
//             >
//                 {getdata.length ? (
//                     <div className='card_details' style={{ width: "24rem", padding: 10 }}>
//                         <Table>
//                             <thead>
//                                 <tr>
//                                     <th>Photo</th>
//                                     <th>Details</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {getdata.map((e) => (
//                                     <tr key={e.id}>
//                                         <td>
//                                             <img src={e.imgdata} style={{ width: "5rem", height: "5rem" }} alt="" />
//                                         </td>
//                                         <td>
//                                             <p>{e.rname}</p>
//                                             <p>Price: ₹{e.price}</p>
//                                             <div className='d-flex align-items-center'>
//                                                 <button className='btn btn-sm btn-danger' onClick={() => handleDecreaseQuantity(e)}>-</button>
//                                                 <span className='mx-2'>{e.qnty}</span>
//                                                 <button className='btn btn-sm btn-success' onClick={() => handleIncreaseQuantity(e)}>+</button>
//                                             </div>
//                                             <br />
//                                             <p style={{ color: "red", fontSize: 20, cursor: "pointer" }} onClick={() => dispatch(DLT(e.id))}>
//                                                 <i className='fas fa-trash'></i>
//                                             </p>
//                                             <NavLink to={`/cart/${e.id}`} className='btn btn-primary btn-sm mt-2'>View Details</NavLink>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>            
//                         </Table>
//                         <h4 className="text-end mt-3">Grand Total: ₹{calculateTotal()}</h4>
//                         <Button  className='btn btn-warning w-100 mt-2 bg-warning' onClick={handleBackToHome}>Order</Button>
//                     </div>
//                 ) : (
//                     <div className='card_details d-flex justify-content-center align-items-center' style={{ width: "24rem", padding: 10, position: "relative" }}>
//                         <i className='fas fa-close smallclose' onClick={handleClose} style={{ position: "absolute", top: 2, right: 20, fontSize: 23, cursor: "pointer" }}></i>
//                         <p style={{ fontSize: 22 }}>Your cart is empty</p>
//                         <img src="./cart.gif" alt="" className='emptycart_img' style={{ width: "5rem", padding: 10 }} />
//                     </div>
//                 )}
//             </Menu>
//         </>
//     )
// }

// export default Header;