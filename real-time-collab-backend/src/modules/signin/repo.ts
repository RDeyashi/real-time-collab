import Users from "../../model/user";
import { iSigninRepo } from "./iSigninRepo";
import * as types from './types'
import { Messages } from './messages'
import bcrypt from "bcryptjs"

export class SigninRepo implements iSigninRepo {
    async signin(
        payload: types.signin
    ): Promise<any> {
        try {
            const email = payload.email;
            const password = payload.password;
            const user = await Users.findOne({ email })

            if (!user) {
                throw Messages.InvalidEmailPassword
            }

            const isMatch = password == user.password ? true : false;

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