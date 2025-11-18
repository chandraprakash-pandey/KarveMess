import { instance } from "../index.js"
import crypto from "crypto"
import User from "../models/user.js"

export const processPayment = async(req,res) => {
    const option ={
        amount:Number(req.body.amount*100),
        currency: "INR",
    }

    const order = await instance.orders.create(option);

    res.status(200).json({
        success: true,
        order
    })
}

export const getKey = (req,res) => {
    res.status(200).json({
        key:process.env.RAZORPAY_API_KEY
    })
}


export const paymentVerification = async (req,res) => {
    const {razorpay_payment_id, razorpay_order_id,razorpay_signature} = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_API_SECRET).update(body.toString()).digest("hex");
    console.log(`Razorpay Signature: ${razorpay_signature}`);
    console.log(`Expected Signature: ${expectedSignature}`);

    const isAuthentic = expectedSignature === razorpay_signature;

    if(isAuthentic){
        // console.log("hi");
        const user = req.user._id;
        console.log(user);
        
        await User.findByIdAndUpdate(user, {subscribed: true}, {new: true});
        
        return res.redirect(`http://localhost:5173/user`)
    }else{
        res.status(404).json({
        success:false
    })
    }
}