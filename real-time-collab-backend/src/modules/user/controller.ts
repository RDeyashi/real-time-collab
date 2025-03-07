import express from "express";
import { iUserService } from "./iUserService";
import { UserService } from "./service";
import * as types from './types';
import { UserRepo } from "./repo";

class UserController {
    private readonly userService: iUserService;
    constructor(userService: iUserService) {
        this.userService = userService;
        this.addUser = this.addUser.bind(this);
    }

    async addUser(
        req: express.Request,
        res: express.Response
    ): Promise<void> {
        try {
            const payload: types.addUser = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
            }
            const resData = this.userService.addUser(payload)
            console.log('Add User Controller')
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}
const userRepoInstance = new UserRepo()
const userServiceInstance = new UserService(userRepoInstance);
export default new UserController(userServiceInstance);