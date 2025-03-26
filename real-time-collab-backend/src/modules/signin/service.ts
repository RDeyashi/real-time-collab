import { eErrorMessage } from "../../enum/error-message.enum";
import { eStatusCode } from "../../enum/status-code.enum";
import { setResponse } from "../../handler/responsehandler";
import { serviceResponse } from "../../types/response.types";
import { iSigninRepo } from "./iSigninRepo";
import { iSigninService } from "./iSigninService";
import * as types from './types'
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Messages } from "./messages";

const dotenvResult = dotenv.config({ path: `.env.${process.env.ENVIRONMENT}` });
const SECRET_KEY: any = process.env.SECRET_KEY
if (dotenvResult.error) {
    throw dotenvResult.error;
}

export class SigninService implements iSigninService {
    private readonly signinRepo: iSigninRepo;
    constructor(signinRepo: iSigninRepo) {
        this.signinRepo = signinRepo;
    }

    async signin(
        payload: types.signin
    ): Promise<serviceResponse> {
        let response: serviceResponse = {
            statusCode: eStatusCode.BAD_REQUEST,
            isError: true,
            message: eErrorMessage.ServerError,
        };

        try {
            const signInResponse: types.User = await this.signinRepo.signin(payload);

            const returnPayload = {
                name: signInResponse.name,
                email: signInResponse.email
            }
            console.log(signInResponse)

            if (signInResponse) {
                const token = jwt.sign({ users: returnPayload }, SECRET_KEY,{
                    expiresIn: '1h'
                })

                response = setResponse(response, eStatusCode.OK, false, Messages.Signin, token)
            }


        } catch (error: any) {
            console.error('signinServiceError', error);
            response = setResponse(response, eStatusCode.BAD_REQUEST, true, error)
        } finally {
            return response;
        }
    }
}