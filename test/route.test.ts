import { describe, expect, it, beforeEach, jest } from '@jest/globals';
import request from 'supertest';

const userList = [{ id: 1 }, { id: 2 }, { id: 3 }];

const persistAndFlush = jest.fn(async (entity: {}) => {});
const find = jest.fn(
    async (entity: any, {}, { orderBy }: { orderBy: { createdAt?: 'asc' | 'desc' } }) => userList,
);

jest.mock('../src/database/orm.ts', () => ({
    orm: {
        em: {
            persistAndFlush,
            find,
        },
    },
}));
jest.mock('../src/database/entities/user.ts');

import { userRouter } from '../src/routes/users.ts';
import express from 'express';
import { errorHandler } from '../src/app.ts';

const app = express();
app.use(express.json());
app.use('/', userRouter);
app.use(errorHandler);

describe('User Get endpoint', () => {
    beforeEach(() => {
        find.mockClear();
    });

    it('retrieves user list', async () => {
        const result = await request(app).get('');

        expect(result.statusCode).toBe(200);
        expect(find).toBeCalled();
        expect(result.body).toEqual({
            status: 'success',
            body: userList,
        });
    });

    it('accepts created=asc query', async () => {
        const result = await request(app).get('').query({ created: 'asc' });

        expect(result.statusCode).toBe(200);
        expect(find).toBeCalled();
        expect(result.body).toEqual({
            status: 'success',
            body: userList,
        });
    });

    it('accepts created=desc query', async () => {
        const result = await request(app).get('').query({ created: 'desc' });

        expect(result.statusCode).toBe(200);
        expect(find).toBeCalled();
        expect(result.body).toEqual({
            status: 'success',
            body: userList,
        });
    });

    it('does not accept arbitrary created values', async () => {
        const result = await request(app).get('').query({ created: 'arbitrary' });

        expect(result.statusCode).toBe(422);
        expect(find).not.toBeCalled();
        expect(result.body).toMatchObject({
            status: 'fail',
        });
    });
});

describe('User post end-point', () => {
    beforeEach(() => {
        persistAndFlush.mockClear();
    });

    it('accepts and saves a valid user object', async () => {
        const result = await request(app)
            .post('')
            .send({ name: 'John Doe', email: 'john.doe@example.com' });
        expect(result.statusCode).toBe(201);
        expect(persistAndFlush).toBeCalled();
    });

    it('does not accept invalid emails', async () => {
        const result = await request(app)
            .post('')
            .send({ name: 'John Doe', email: 'john.doe@example' });

        expect(result.statusCode).toBe(422);
        expect(persistAndFlush).not.toBeCalled();
        expect(result.body).toMatchObject({ status: 'fail' });
    });

    it('does not accept missing email field', async () => {
        const result = await request(app).post('').send({ name: 'John Doe' });

        expect(result.statusCode).toBe(422);
        expect(persistAndFlush).not.toBeCalled();
        expect(result.body).toMatchObject({ status: 'fail' });
    });

    it('does not accept missing name field', async () => {
        const result = await request(app).post('').send({ email: 'john.doe@example' });

        expect(result.statusCode).toBe(422);
        expect(persistAndFlush).not.toBeCalled();
        expect(result.body).toMatchObject({ status: 'fail' });
    });
});
