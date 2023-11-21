import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {connection} from "./db/mongodbConnection";
import userRoute from './routes/userRoutes';
import cors from "cors";
dotenv.config();
const app: Express = express();
app.use(cors());
app.use(express.json());
import cookieParser from 'cookie-parser';
const port = process.env.PORT;
app.get('/', (req: Request, res: Response) => {
  res.send('⚡️ Simulation Backend Server ⚡️');
});
app.use('/z1',userRoute);
app.use(cookieParser());
app.listen(port, async() => {
  try{
    await connection;
    console.log(`mongodb is connected &`);
  }catch(err)
  {
    console.log(err);
  }
  console.log(`⚡️[server]: Server is running at http://localhost:${port}⚡️`);
});