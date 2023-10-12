import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import {connection} from "./db/mongodbConnection";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, async() => {
  try{
    await connection;
    console.log(`mongodb is connected &`);
  }catch(err)
  {
    console.log(err);
  }
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});