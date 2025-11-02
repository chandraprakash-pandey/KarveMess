import { Router } from "express"
import FoodItem from "../models/foodItems.js"

const router = Router();

router.get("/", async (req,res) => {
    const foodItems = await FoodItem.find({}).populate("chefId");

    res.json(foodItems);
});

export default router;
