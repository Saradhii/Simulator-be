import express from "express";
import { userLogin } from "../controllers/login/userLogin";
const userRoute = express.Router();

userRoute.post("/userlogin",userLogin);
export default userRoute;