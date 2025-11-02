import User from "../models/user.js"
import { Router } from "express"

const router = Router();

router.get('/signup', (req,res) => {
    return res.send("signup")
})

router.get('/login', (req,res) => {
    return res.send("Login")
})

router.post('/signup', async (req, res) => {
    try {
        const { fullName, email, password, messName, messAddress } = req.body;

        await User.create({ fullName, email, password, messName, messAddress });

        return res.status(200).json({ message: "Signup successful" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Signup failed" });
    }
})

router.post('/login', async (req,res) => {

    const {email, password} = req.body;
    console.log(email,password);
    
    try{
        const token = await User.matchPasswordAndGenerateToken(email,password);

        return res.cookie('token', token).json({message: "Login Successful"});

    }catch(err){
        console.error(err);
        return res.status(500).json({ error: "Signup failed" });
    }
})

router.get("/logout", (req,res) => {
    res.clearCookie("token").json({message: "Logout Successful"});
})

export default router