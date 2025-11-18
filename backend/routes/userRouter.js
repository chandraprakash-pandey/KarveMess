import { Router } from "express"

const router = Router();

router.get("/", (req,res) => {
    const user = req.user

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    return res.json(user);
})


export default router;