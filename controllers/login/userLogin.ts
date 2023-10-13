import { Request, Response } from "express";

export const userLogin = async(req: Request, res: Response)=>{
   const email = req.body.email;
   const password = req.body.password;
   console.log(`user email is :`,email);
}