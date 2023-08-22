import { Request, Response, Router } from 'express';
import { body, validationResult } from 'express-validator';
import { HttpUnprocessableEntityException } from '../exceptions/HttpUnprocessableEntity.js';
import { orm } from '../database/orm.js';
import { User } from '../database/entities/user.js';
import httpStatus from 'http-status';

const router = Router();

router
    .route('users')
    .post(
        body('name').trim().notEmpty().isString(),
        body('email').isEmail().trim(),
        async (req: Request, res: Response) => {
            const validation = validationResult(req);

            if (!validation.isEmpty()) {
                throw new HttpUnprocessableEntityException(validation.array);
            }

            const user = new User(req.body);
            await orm.em.flush();

            return res.status(httpStatus.CREATED).send({ status: 'success' });
        },
    );

export { router as userRouter };
