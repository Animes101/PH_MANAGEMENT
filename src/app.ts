import express, {Application } from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import { UserRoutes } from './app/modules/user/user.route';
import { errorHandler } from './middlwares/globallErrorHandler';
import notFound from './middlwares/notFound';
import { StudentRoutes } from './app/modules/student/student.router';
import { academicSemesterRoute } from './app/modules/acadamicSemister/semister.route';
import { AcademicFacultyRoutes } from './app/modules/academicFaculty/faculty.router';
import { academinRouterDepartment } from './app/modules/acdemonDepermant/academinRouter';
import { adminRouter } from './app/modules/admin/admin.route';
import { facalityRouter } from './app/modules/facality/facality.router';
import { CorseRouter } from './app/modules/corses/cors.router';
import { RegisterRouter } from './app/modules/semesterRegistation/Register.Router';
import { OfferCourseRoutes } from './app/modules/offerCorse/offerCorse.router';
import { AuthRoutes } from './app/modules/Auth/auth.route';
const app: Application = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser())



app.use('/api/v1', UserRoutes);
app.use('/api/v1', StudentRoutes);
app.use('/api/v1', academicSemesterRoute);
app.use('/api/v1', AcademicFacultyRoutes);
app.use('/api/v1', academinRouterDepartment)
app.use('/api/v1', adminRouter)
app.use('/api/v1', facalityRouter)
app.use('/api/v1', CorseRouter)
app.use('/api/v1', RegisterRouter)
app.use('/api/v1', OfferCourseRoutes)
app.use('/api/v1', AuthRoutes)

app.get('/test', (req,res)=>{

    res.send('testin router')
})


//Global Error Handler
app.use(errorHandler);

//Not Fount Route
app.use(notFound)

export default app;
