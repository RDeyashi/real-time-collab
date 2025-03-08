import express from 'express'
import { iSigninService } from "./iSigninService";
import * as types from './types'
import { responseHandler } from '../../handler/responsehandler';
import { eStatusCode } from '../../enum/status-code.enum';
import { eErrorMessage } from '../../enum/error-message.enum';
import { SigninRepo } from './repo';
import { SigninService } from './service';

class SigninController {
    private readonly signinService: iSigninService
    constructor(signinService: iSigninService) {
        this.signinService = signinService;
        this.signin = this.signin.bind(this);
    }

    async signin(
        req: express.Request,
        res: express.Response
    ): Promise<any> {
        try {
            const payload: types.signin = {
                email: req.body.email,
                password: req.body.password
            }

            const response = await this.signinService.signin(payload)

            responseHandler(
                res,
                response.statusCode,
                response.isError,
                response.message,
                response?.data
            )
        } catch (error) {
            console.error('signinController', error);
            responseHandler(
                res,
                eStatusCode.INTERNAL_SERVER_ERROR,
                true,
                eErrorMessage.ServerError,
                error
            );
        }
    }
}

const signinRepoInstance = new SigninRepo();
const signinServiceInstance = new SigninService(signinRepoInstance);
export default new SigninController(signinServiceInstance);