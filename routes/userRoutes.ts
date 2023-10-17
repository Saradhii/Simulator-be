import express from "express";
import { userLogin } from "../controllers/login/userLoginController";
import { userSignUp } from "../controllers/signup/userSignUpController";
const userRoute = express.Router();
userRoute.post("/userlogin",userLogin);
userRoute.post("/usersignup",userSignUp);
export default userRoute;