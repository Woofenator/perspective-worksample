import { RequestContext } from '@mikro-orm/core';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { orm } from './database/orm.js';
import { userRouter } from './routes/users.js';
import { BaseException } from './exceptions/baseException.js';

const app = express();

app.use(cors());
app.use(express.json());
app.options('*', cors());
app.use((_req, _res, next) => {
    RequestContext.create(orm.em, next);
});

app.use('/users', userRouter);

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    if (!(err instanceof BaseException)) {
        console.error(err);

        return res.status(500).send({ status: 'fail' });
    }

    return res.status(err.statusCode).send({
        status: 'fail',
        message: err.message,
        body: err.body,
    });
}

app.use(errorHandler);

export { app };
