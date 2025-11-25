import express from 'express';
import type { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from 'cors'
import morgan from 'morgan'; //logger
import path from 'path';
import { prismaDb1, prismaDb2, prismaDb3 } from './database/postgres';


dotenv.config();
const app: Express = express();

app.use(cors());
app.use(morgan("dev"))
app.use(express.static(path.join(__dirname, 'public')))//folder public staic 
app.use(express.json({ limit: '50mb' }))


const PORT = process.env.PORT;

app.get('/', (_: Request, res: Response) => {
    return res.status(200).send({ message: 'test api' });
});

app.get('/user/db1', async (_: Request, res: Response) => {
    const users = await prismaDb1.user.findMany();
    return res.status(200).send(users)
});

app.get('/customer/db2', async (_: Request, res: Response) => {
    const customers = await prismaDb2.customer.findMany()
    return res.status(200).send(customers)
});

app.get('/employee/db3', async (_: Request, res: Response) => {
    const customers = await prismaDb3.employee.findMany();
    return res.status(200).send(customers)
});


app.listen(PORT, () => {
    console.log(`Server is runnign at http://localhost:${PORT}`);
});

