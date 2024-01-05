import express from "express";
import { userLogin } from "../controllers/login/userLoginController";
import { userSignUp } from "../controllers/signup/userSignUpController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { userDetails } from "../controllers/userDetails/userDetails";
const userRoute = express.Router();
userRoute.post("/userlogin",userLogin);
userRoute.post("/usersignup",userSignUp);
userRoute.get("/userdetails",authMiddleware,userDetails);
export default userRoute;

