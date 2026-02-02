import express, { Application} from 'express';
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';

const app: Application = express();

// middlewares
app.use(cors());
app.use(express.json());


app.use('/api/v1', UserRoutes);

export default app;
