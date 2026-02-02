import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app: Application = express();

// middlewares
app.use(cors());
app.use(express.json());

// test route
app.get('/', (req: Request, res: Response) => {
  

  console.log('hello world');
  res.send('🚀 Express + TypeScript Server Running ok server is running');
});

export default app;
