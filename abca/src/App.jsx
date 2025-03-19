// import Header from "./components/Header"
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Cards from "./components/Cards";
// import CardDetails from "./components/CardDetails";
// import CardsData from "./components/CardsData";
// import {Routes,Route} from 'react-router-dom'
// import About from "./components/About";
// import SuperUserDetails from "./components/SuperuserDetails";

// function App() {
//   return (
//     <>
//       <Header/>
//       <Routes>
//         <Route path="/" element={<Cards/>}/>
//         <Route path="/about" element={<About/>}/>
//         <Route path="/cart/:id" element={<CardDetails/>}/>
//         <Route path="/superuser" element={<SuperUserDetails/>}/>
//       </Routes>
//     </>
//   )
// }

// export default App


import Header from "./components/Header"
import 'bootstrap/dist/css/bootstrap.min.css';
import Cards from "./components/Cards";
import SuperUserDetails from "./components/SuperUserDetails";
import CardDetails from "./components/CardDetails";
import CardsData from "./components/CardsData";
import React, { useEffect, useState} from 'react';
import {Routes,Route,Router,useNavigate} from 'react-router-dom'
import About from "./components/About";
import ProtectedRoute from "./components/ProtectedRoute";
// import ServicesPage from "./components/Services";
import { ToastContainer, toast } from 'react-toastify';
import Login from "./components/Login";
import Signup from "./components/Signup";
import AdminPanel from "./components/Adminpanel";
import BookTable from "./components/Boking";
function App() {

  return (
    <>
      <Header/>
     
      <Routes>
        <Route path="/" element={<Cards/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/cart/:id" element={<CardDetails/>}/>
        <Route path="/superuser" element={<SuperUserDetails/>}/>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel />}/>
        <Route path="/book-table" element={<BookTable />} />
        <Route path="/" element={<ProtectedRoute> <Header /> </ProtectedRoute>} />
      </Routes>      
    </>
  )
}

export default App
