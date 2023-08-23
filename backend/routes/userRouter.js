import express from "express";
// import { createUserController } from "../controllers/userController.js";
// import { loginUserController } from "../controllers/userController.js";
// import { getAllUsersController } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import  * as user from "../controllers/userController.js";

const userRouter = express.Router();

// userRouter.get("/order", getOrders);

userRouter.post("/user/register", user.createUserController);
userRouter.post("/user/login", user.loginUserController);
userRouter.get("/user/getUsers", authMiddleware, user.getAllUsersController);
// userRouter.delete("/order/:id", deleteOrder);

export default userRouter;
