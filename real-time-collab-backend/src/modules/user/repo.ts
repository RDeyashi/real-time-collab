import { iUserRepo } from "./iUserRepo";
import * as types from "./types";
import connectDB from "../../infractructure/database"

const dbConnection = connectDB()
export class UserRepo implements iUserRepo{
    async addUser(payload: types.addUser){
        console.log('USER REPO', payload, dbConnection)
    }
}