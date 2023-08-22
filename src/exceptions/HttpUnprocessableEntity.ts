import httpStatus from 'http-status';
import { BaseException } from './baseException.js';

export class HttpUnprocessableEntityException extends BaseException {
    statusCode: number = httpStatus.UNPROCESSABLE_ENTITY;
    message: string = 'Unprocessable Entity';
}
