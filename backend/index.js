import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors"
import statcRouter from "./routes/staticRouter.js"; 
import userRouter from "./routes/userRouter.js";
import fooditemsRouter from "./routes/fooditemsRouter.js";
import cookieParser from "cookie-parser";
import {checkForAuthentication, restrictTo} from "./middleware/auth.js"
import menuRouter from "./routes/menuRouter.js";
import myItemsRouter from "./routes/myItemsRouter.js";
import editItemRouter from "./routes/editItemRouter.js";
import paymentRoutes from "./routes/paymentRoutes.js"
import Razorpay from "razorpay"

dotenv.config();

mongoose.connect(process.env.MONGO_URL).then(e=> console.log("MongoDB Connected")).catch(err => console.error(err))

const app = express()
const PORT = process.env.PORT || 8000;

app.use(express.urlencoded({extended:true}));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(checkForAuthentication)
app.use("/", statcRouter);
app.use("/user", restrictTo(), userRouter);
app.use("/fooditems",restrictTo(), fooditemsRouter);
app.use("/menu", menuRouter);
app.use("/myItems", myItemsRouter);
app.use("/editItem", editItemRouter);
app.use("/api",paymentRoutes);

app.get("/", (req,res) => {
    console.log(req.user._id);
    return res.json({mssg: "Hello World"});
})

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET
})


app.listen(PORT, () => console.log(`Server Running at http://localhost:${PORT}`));