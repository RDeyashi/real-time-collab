import Users from "../../model/user";
import { iSigninRepo } from "./iSigninRepo";
import * as types from './types';
import { Messages } from './messages';
import bcrypt from "bcryptjs";
import * as CryptoJS from 'crypto-js';
import dotenv from "dotenv";
const dotenvResult = dotenv.config({ path: `.env.${process.env.ENVIRONMENT}` });
if (dotenvResult.error) {
    throw dotenvResult.error;
}

export class SigninRepo implements iSigninRepo {
    async signin(
        payload: types.signin
    ): Promise<any> {
        try {
            const SECRET_KEY: string = process.env.SECRET_KEY_PSWD!
            const email = payload.email;
            let password = CryptoJS.AES.decrypt(payload.password, SECRET_KEY);
            const payloadPswd = password.toString(CryptoJS.enc.Utf8)
            const user = await Users.findOne({ email })

            if (!user) {
                throw Messages.InvalidEmailPassword
            }

            let userPswd = CryptoJS.AES.decrypt(user.password, SECRET_KEY);
            const userPassword = userPswd.toString(CryptoJS.enc.Utf8)

            const isMatch = payloadPswd == userPassword ? true : false;

            if (!isMatch) {
                throw Messages.InvalidEmailPassword
            }

            return user;

        } catch (error) {
            console.error('signinRepoError', error)
            throw error;
        }
    }
}