import { Router } from "express";
import { loginUser, registerUser, userAuth, verifyTokenMiddleware } from "../controllers/userController";

const router = Router();

router.get("/userAuth", verifyTokenMiddleware, userAuth);
router.post("/register", registerUser)
router.post("/login", loginUser)

export default router;
