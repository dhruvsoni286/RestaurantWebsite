// import React, { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { signUp } from "../redux/actions/authAction";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import "./Signup.css"; // Import CSS

// const Signup = () => {
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         password: ""
//     });
//     // useEffect(()=>{
//     //     console.log("This is FormData",formData);
//     // },[formData])
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
        
//         if (!formData.name || !formData.email || !formData.password) {
//             toast.error("All fields are required!");
//             return;
//         }

//         dispatch(signUp(formData));
//         toast.success("Signup successful!",{
//             position: 'top-center',
//             autoClose: 2000,
//              hideProgressBar: false,
//              closeOnClick: true,
//              pauseOnHover: true,
//              draggable: true,
//         });
        
//         navigate("/");
//     };
//     const handleSignup = () => {
//         const storedCustomers =  JSON.parse(localStorage.getItem('customers')) !== null ? JSON.parse(localStorage.getItem('customers')) : [] ;
//         console.log("Stored Customers",storedCustomers);
        
//         storedCustomers.push(formData);
//         localStorage.setItem('customers', JSON.stringify(storedCustomers));
//     };

//     return (
//         <div className="signup-container">
//             <h2>Sign Up</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                     <label className="form-label">Name</label>
//                     <input type="text" name="name" className="form-control" onChange={handleChange} required />
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Email</label>
//                     <input type="email" name="email" className="form-control" onChange={handleChange} required />
//                 </div>
//                 <div className="mb-3">
//                     <label className="form-label">Password</label>
//                     <input type="password" name="password" className="form-control" onChange={handleChange} required />
//                 </div>
//                 <button type="submit" className="btn btn-primary" onClick={()=>{handleSignup()}}> Sign Up</button>
//                 <p className="form-text">Already have an account? <a href="/login">Login here</a></p>
//             </form>
//         </div>
//     );
// };

// export default Signup;


import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../redux/actions/authAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios"; // Import axios for API calls
import "./Signup.css"; // Import CSS

const Signup = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.name || !formData.email || !formData.password) {
            toast.error("All fields are required!");
            return;
        }

        try {
            console.log(formData);
            
            const response = await axios.post("http://localhost:5000/api/signup", formData);
            
            if (response.data.success) {
                toast.success("Signup successful!", {
                    position: 'top-center',
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });

                dispatch(signUp(formData));
                navigate("/login");
            } else {
                toast.error(response.data.message || "Signup failed. Try again!");
            }
        } catch (error) {
            console.log(error);
            
            toast.error(error.response?.data?.message || "Something went wrong!");
        }
    };

    return (
        <div className="signup-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" name="name" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" name="email" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-primary">Sign Up</button>
                <p className="form-text">Already have an account? <a href="/login">Login here</a></p>
            </form>
        </div>
    );
};

export default Signup;
