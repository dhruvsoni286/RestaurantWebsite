import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../redux/actions/authAction";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Login.css"; // Import CSS

const Login = () => {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!credentials.email || !credentials.password) {
            toast.error("Please enter both email and password!");
            return;
        }

        if (!user || user.email !== credentials.email || user.password !== credentials.password) {
            toast.error("Invalid credentials!",{
            position: 'top-center',
            autoClose: 2000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
            });
            return;
        }

        dispatch(logIn());
        toast.success("Login successful!",{
            position: 'top-center',
            autoClose: 2000,
             hideProgressBar: false,
             closeOnClick: true,
             pauseOnHover: true,
             draggable: true,
        });
        navigate("/");
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" name="email" className="form-control" onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" name="password" className="form-control" onChange={handleChange} required />
                </div>
                <button type="submit" className="btn btn-success">Login</button>
                <p className="form-text">Don't have an account? <a href="/signup">Sign up here</a></p>
            </form>
        </div>
    );
};

export default Login;
