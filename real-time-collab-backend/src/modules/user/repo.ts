import { iUserRepo } from "./iUserRepo";
import * as types from "./types";
import connectDB from "../../infractructure/database";
import Users from "../../model/user";
import { Messages } from "./messages";

const dbConnection = connectDB()
export class UserRepo implements iUserRepo {
    async checkUserExists(email: string, userName:string): Promise<any> {
        try {
            const existingUser = await Users.findOne({
                $or: [{email: email}, {userName: userName}]
            })

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
        try {
            const userName = payload.username;
            const email = payload.email;
            const password = payload.password;

            const newUser = new Users({ userName, email, password });
            const addUser = await newUser.save();

            if (!addUser) {
                return false
            }
            return addUser
        } catch (error) {
            console.error('addUserRepoError', error)
            throw error;
        }
    }

    async getUsers() {
        try {
            const allUser = await Users.find()
            console.log('getUsersRepo', allUser)
            if (!allUser.length) {
                return false
            }
            return allUser;
        } catch (error) {
            console.error('getUsersRepoError', error)
            throw error;
        }
    }
}