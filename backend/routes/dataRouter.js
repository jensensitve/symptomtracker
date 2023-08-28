import express from "express";
// import { createUserController } from "../controllers/userController.js";
// import { loginUserController } from "../controllers/userController.js";
// import { getAllUsersController } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import  * as user from "../controllers/userController.js";

const dataRouter = express.Router();


dataRouter.post("/data/healthlog", authMiddleware, user.addHealthLogController);
dataRouter.get("/data/healthlogs", authMiddleware, user.getAllForUserController);


export default dataRouter;
