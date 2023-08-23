import { Request, Response, Router } from 'express';
import asyncHandler from 'express-async-handler';
import { body, validationResult, query } from 'express-validator';
import httpStatus from 'http-status';
import { User } from '../database/entities/user.js';
import { orm } from '../database/orm.js';
import { HttpUnprocessableEntityException } from '../exceptions/HttpUnprocessableEntity.js';

const router = Router();

router
    .route('')
    .post(
        body('name').trim().notEmpty().isString(),
        body('email').isEmail().trim(),
        asyncHandler(async (req: Request, res: Response) => {
            const validation = validationResult(req);

            if (!validation.isEmpty()) {
                throw new HttpUnprocessableEntityException(validation.array());
            }

            const user = new User(req.body);
            // Save user entity in database
            await orm.em.persistAndFlush([user]);

            res.status(httpStatus.CREATED).send({ status: 'success' });
        }),
    )
    .get(
        query('created').optional().toLowerCase().isIn(['asc', 'desc']),
        asyncHandler(async (req: Request, res: Response) => {
            const validation = validationResult(req);

            if (!validation.isEmpty()) {
                throw new HttpUnprocessableEntityException(validation.array());
            }

            const users = await orm.em.find(
                User,
                {},
                {
                    // Inline check for `created` field in query.
                    // Not exactly readable, but best I could come up with to not overcomplicate things
                    orderBy: req.query.created ? { createdAt: req.query.created } : {},
                },
            );

            res.status(httpStatus.OK).send(users);
        }),
    );

export { router as userRouter };
