// import React, { useEffect, useState } from 'react'
// import Table from 'react-bootstrap/Table'
// import { useNavigate, useParams } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { DLT,ADD,REMOVE } from '../redux/actions/action'


// const CardsDetails = () => {

//   const [data,setData] = useState([]);
//   // console.log(data);

//   const {id} = useParams();
//   // console.log(id);

//   const history = useNavigate();

//   const dispatch = useDispatch();

  
//   const getdata = useSelector((state)=> state.cartreducer.carts);
//   // console.log(getdata);


//   const compare = ()=>{
//     let comparedata = getdata.filter((e)=>{
//       return e.id == id
//     });
//     setData(comparedata);
//   }

//   // add data
  

//   const send = (e)=>{
//     // console.log(e);
//     dispatch(ADD(e));
//   }
  
//   const dlt = (id)=>{
//     dispatch(DLT(id));
//     history("/");
// }

// // remove one
// const remove = (item)=>{
//   dispatch(REMOVE(item))
// }


//   useEffect(()=>{
//     compare();
//   },[id])

//   return (
//     <>
//       <div className="container mt-2">
//         <h2 className='text-center'style={{color:'rgba(40, 128, 138, 0.99)'}}>Iteams Details Page
//         </h2>

//         <section className='container mt-3'>
//           <div className="iteamsdetails d-flex gap-4  ">
//           {
//             data.map((ele)=>{
//               return (
//                 <>
//                 <div className="items_img">
//               <img src={ele.imgdata} alt=""  height={300} width={300}/>
//             </div>

//             <div className="details " >
//               <Table>
//                 <tr>
//                   <td>
//                     <p> <strong>Restaurant</strong>  : {ele.rname}</p>
//                     <p> <strong>Price</strong>  : ₹{ele.price}</p>
//                     <p> <strong>Dishes</strong>  : {ele.address}</p>
//                     <p> <strong>Total</strong>  :₹  {ele.price * ele.qnty}</p>
                    
                  
                  
//                     <p><strong>Rating :</strong> <span style={{background:"green",color:"#fff",padding:"2px 5px",borderRadius:"5px"}}>{ele.rating} ★	</span></p>
//                     <p><strong>Order Review :</strong> <span >{ele.somedata}	</span></p>
//                   </td>
//                 </tr>
//               </Table>
//             </div>
          
//                 </>
//               )
//             })
//           }
//           </div>
//         </section>
//       </div>
//     </>
//   )
// }

// export default CardsDetails
import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DLT, ADD, REMOVE } from '../redux/actions/action';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import './CardsDetails.css'; // Import custom CSS for styling

const CardsDetails = () => {
  const [data, setData] = useState([]);
  const { id } = useParams();
  const history = useNavigate();
  const dispatch = useDispatch();
  const getdata = useSelector((state) => state.cartreducer.carts);

  const compare = () => {
    let comparedata = getdata.filter((e) => e.id == id);
    setData(comparedata);
  };

  const send = (e) => {
    dispatch(ADD(e));
  };

  const dlt = (id) => {
    dispatch(DLT(id));
    history('/');
  };

  const remove = (item) => {
    dispatch(REMOVE(item));
  };

  useEffect(() => {
    compare();
  }, [id]);

  return (
    <Container className="mt-4">
      <h2 className="text-center mb-4" style={{ color: 'rgba(40, 128, 138, 0.99)' }}>
        Item Details Page
      </h2>

      {data.map((ele) => (
        <Card key={ele.id} className="mb-4 shadow-sm ">
          <Row className="g-10">
            <Col md={4}>
              <img
                src={ele.imgdata}
                alt={ele.rname}
                className="img-fluid rounded-start"
                style={{ height: '100%', width: '100%', objectFit: 'cover' }}
              />
            </Col>
            <Col md={8}>
              <Card.Body>
                <Card.Title className="mb-3">{ele.rname}</Card.Title>
                <Table borderless>
                  <tbody>
                    <tr>
                      <td>
                        <strong>Price:</strong> ₹{ele.price}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Dishes:</strong> {ele.address}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Total:</strong> ₹{ele.price * ele.qnty}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Rating:</strong>{' '}
                        <span
                          style={{
                            background: 'green',
                            color: '#fff',
                            padding: '2px 5px',
                            borderRadius: '5px',
                          }}
                        >
                          {ele.rating} ★
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <strong>Order Review:</strong> {ele.somedata}
                      </td>
                    </tr>
                  </tbody>
                </Table>
                
              </Card.Body>
            </Col>
          </Row>
        </Card>
      ))}
    </Container>
  );
};

export default CardsDetails;