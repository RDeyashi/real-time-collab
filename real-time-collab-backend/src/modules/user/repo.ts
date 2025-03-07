import { iUserRepo } from "./iUserRepo";
import * as types from "./types";
import connectDB from "../../infractructure/database";
import Users from "../../model/user";
import { Messages } from "./messages";

const dbConnection = connectDB()
export class UserRepo implements iUserRepo {
    async checkUserExists(email: string): Promise<any> {
        try {
            const existingUser = await Users.findOne({ email })
            console.log('checkUserExistsRepo', existingUser)
            if (!existingUser) {
                return false;
            }
            return existingUser;
        } catch (error) {
            console.error('checkUserExistsRepoError', error)
            throw error;
        }
    }

    async addUser(payload: types.addUser) {
        const userName = payload.username;
        const email = payload.email;
        const password = payload.password;

        const newUser = new Users({ userName, email, password });
        const addUser = await newUser.save();
        console.log('addUserRepo', addUser)
    }
}