import { Router } from "express"
import FoodItem from "../models/foodItems.js"

const router = Router();

const today = new Date();
const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

const dayName = days[today.getDay()];

router.get("/", async (req,res) => {
    const foodItems = await FoodItem.find({day: dayName}).populate("chefId");

    res.json(foodItems);
});

export default router;
