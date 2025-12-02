import express from 'express';
import type { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors'
import morgan from 'morgan'; //logger
import path from 'path';

//routes
import { prismaDb1, prismaDb2, prismaDb3 } from './database/postgres';
import DepartmentRoute from '../src/routes/department-route'

//sync middleware
import { asyncHandler } from './middlewares/async-handler';
//logger middleware
import { loggerHandler } from './middlewares/logger-handler';
//error middleware
import { errorHandler } from './middlewares/error-handler';
import { listRoutes } from './middlewares/list-all-api-routes';


dotenv.config();
const app: Express = express();

app.use(cors());
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, 'public')))//folder public staic 
app.use(express.json({ limit: '50mb' }))
app.use(loggerHandler)


const PORT = process.env.PORT;

app.get('/', (_: Request, res: Response) => {
    return res.status(200).send({ message: 'test api' });
});

/*
app.get('/user', asyncHandler(async (_: Request, res: Response) => {
    const users = await prismaDb1.user.findMany();
    return res.status(200).send(users)
}));

app.get('/customer', asyncHandler(async (_: Request, res: Response) => {
    const customers = await prismaDb2.customer.findMany()
    return res.status(200).send(customers)
}));

app.get('/account', asyncHandler(async (_: Request, res: Response) => {
    const account = await prismaDb3.account.findMany();
    return res.status(200).send(account)
}));
*/

// app.get('/test-test', async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const [departments, totalDepartments] = await prismaDb1.$transaction([
//             prismaDb1.department.findMany(),
//             prismaDb1.department.count()
//         ])
//         return res.status(200).json({ departments, totalDepartments });
//     } catch (error) {
//         return res.status(500).json({ error: error.message });
//     }
// })

app.use('/api/v1/department', DepartmentRoute);

app.get("/routes", listRoutes(app));

//error middleware ต้องอยู่ล่างสุดเสมอ
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is runnign at http://localhost:${PORT}`);
});

