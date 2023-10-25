import express from "express";
import { userLogin } from "../controllers/login/userLoginController";
import { userSignUp } from "../controllers/signup/userSignUpController";
import { authMiddleware } from "../middlewares/authMiddleware";
const userRoute = express.Router();
userRoute.post("/userlogin",userLogin);
userRoute.post("/usersignup",userSignUp);
userRoute.get("/userDetails",authMiddleware,)
export default userRoute;