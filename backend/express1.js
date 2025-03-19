
const express = require("express");
const cors=require('cors')
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs"); // Import User Model
const bodyParser = require('body-parser')
const app = express()
app.use(cors({
    origin:'http://localhost:5173'
}))
app.use(bodyParser.json())

mongoose.connect('mongodb://127.0.0.1:27017/Restorunt') .then(()=>{console.log("Connection Success")})
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});
const User = mongoose.model("User", UserSchema);


const CartSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 1 },
    image: { type: String, required: true },
    userId: { type: String, required: true }, // User who adds items to the cart
});
const Cart = mongoose.model("Cart", CartSchema);


const OrderSchema = new mongoose.Schema({
    customername: { type: String, required: true },
    grandTotal: { type: Number, required: true },
    orderDate: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", OrderSchema);

const BookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    guests: { type: Number, required: true },
    specialRequest: { type: String },
    bookingDate: { type: Date, default: Date.now },
});

const Booking = mongoose.model("Booking", BookingSchema);

app.get('/api/adminData',async(req,res)=>{
    try {
        const count =await User.countDocuments();
        // const cartcount =await Cart.countDocuments();
        // const ordercount =await Order.countDocuments();
        const bookcount =await Booking.countDocuments();
        const result = await Order.aggregate([
            { $group: { _id: null, total: { $sum: "$grandTotal" } } }
        ]);
        
        const total = result.length > 0 ? result[0].total : 0;
        res.json({userCount : count , bookcount: bookcount , total:total})
    } catch (error) {
        res.status(400).json({message:'user count not found'})
    }
})
// Signup Route
app.post("/api/signup", async (req, res) => {
    console.log(req.body);
    
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ success: false, message: "User already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save user to MongoDB
        user = new User({ name, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ success: true, message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error" });
    }
});

app.get('/api/adminData1',async(req,res)=>{
    try {
        
        res.json({userCount : count})
    } catch (error) {
        res.status(400).json({message:'user count not found'})
    }
})
app.post("/api/cart", async (req, res) => {
    const { productId, name, price, quantity, image, userId } = req.body;
    try {
        // Check if item already exists in the cart
        let cartItem = await Cart.findOne({ productId, userId });

        if (cartItem) {
            // If the item is already in the cart, update the quantity
            cartItem.quantity += quantity;
            await cartItem.save();
            return res.status(200).json({ success: true, message: "Item updated in cart" });
        } else {
            // If not, create a new cart item
            cartItem = new Cart({ productId, name, price, quantity, image, userId });
            await cartItem.save();
            return res.status(201).json({ success: true, message: "Item added to cart" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});


app.post("/api/saveOrder", async (req, res) => {
    const  {customername, grandTotal,orderDate} = req.body;
    
    try {
        // Create a new order document with username and grandTotal
        const order = new Order({
            customername,
            grandTotal,
            orderDate
        });

        // Save the order in MongoDB
        await order.save();

        res.status(200).json({ success: true, message: "Order saved successfully", data: order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to save order" });
    }
});
app.post("/api/saveBooking", async (req, res) => {
    const { name, email, phone, date, time, guests, specialRequest } = req.body;

    try {
        // Create a new booking document
        const booking = new Booking({
            name,
            email,
            phone,
            date,
            time,
            guests,
            specialRequest,
        });

        // Save the booking in MongoDB
        await booking.save();

        res.status(200).json({ success: true, message: "Booking saved successfully", data: booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to save booking" });
    }
});


app.listen('5000',()=>{
    console.log('Server running on http://localhost:5000');
    
})