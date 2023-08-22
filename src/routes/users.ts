import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { body, validationResult } from 'express-validator';
import httpStatus from 'http-status';
import { User } from '../database/entities/user.js';
import { orm } from '../database/orm.js';
import { HttpUnprocessableEntityException } from '../exceptions/HttpUnprocessableEntity.js';

const router = Router();

router.route('').post(
    body('name').trim().notEmpty().isString(),
    body('email').isEmail().trim(),
    asyncHandler(async (req: Request, res: Response) => {
        const validation = validationResult(req);

        if (!validation.isEmpty()) {
            throw new HttpUnprocessableEntityException(validation.array());
        }

        const user = new User(req.body);
        await orm.em.persistAndFlush([user]);

        res.status(httpStatus.CREATED).send({ status: 'success' });
    }),
);

export { router as userRouter };
