import express, { Express, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { RequestContext } from '@mikro-orm/core';
import { orm } from './database/orm';

dotenv.config();

const app: Express = express();
app.use(cors()).use(express.json()).options('*', cors());
app.use((_req, _res, next) => {
    RequestContext.create(orm.em, next);
});

app.post('/users', (req: Request, res: Response) => {
    res.send({}).status(201);
});
app.get('/users', (req: Request, res: Response) => {
    res.send([]).status(200);
});

const port = process.env.PORT || 3111;
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
