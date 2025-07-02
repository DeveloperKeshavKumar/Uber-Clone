import { Router } from "express";
import userRouter from "./user.routes.js";
import captainRouter from "./captain.routes.js";
import mapRouter from "./map.routes.js";
import rideRouter from "./ride.routes.js";

const router = Router();

router.use("/users", userRouter);
router.use("/captain", captainRouter);
router.use('/maps', mapRouter);
router.use('/ride', rideRouter)

export default router;