import express, {Application } from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
import { errorHandler } from './middlwares/globallErrorHandler';
import notFound from './middlwares/notFound';
const app: Application = express();

// middlewares
app.use(cors());
app.use(express.json());


app.use('/api/v1', UserRoutes);


//Global Error Handler
app.use(errorHandler);

//Not Fount Route
app.use(notFound)

export default app;
