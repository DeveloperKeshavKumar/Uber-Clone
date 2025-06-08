import { Router } from "express";
import userRouter from "./user.routes.js";
import captainRouter from "./captain.routes.js";

const router = Router();

router.use("/users", userRouter);
router.use("/captain", captainRouter);

export default router;