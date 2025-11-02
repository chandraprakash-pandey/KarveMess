import { Router } from "express";
import { validateToken } from "../services/authentication.js";
import FoodItem from "../models/foodItems.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const payload = validateToken(token);
    // console.log(payload._id);

    const foodItems = await FoodItem.find({ chefId: payload._id});

    return res.json(foodItems);
  } catch (error) {
    console.error("Error fetching user items:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
