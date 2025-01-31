import { Router } from "express";
import { signup, signin, google, signOut } from "../controllers/auth.controllers.js";

const router = Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.get("/signout", signOut)

export default router;
