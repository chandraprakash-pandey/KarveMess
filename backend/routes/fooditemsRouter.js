import FoodItem from "../models/foodItems.js";
import { Router } from "express"

const router = Router();

router.get('/', async (req, res) => {
    return res.status(200).json({ message: "Food items route is working!" });
});

router.post('/', async (req, res) => {
    try {
        const { chefId, item } = req.body;

        await FoodItem.create({ chefId, item });

        res.status(201).json({ message: "Food item created successfully" });
    } catch (error) {
        console.error("Error creating food item:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
