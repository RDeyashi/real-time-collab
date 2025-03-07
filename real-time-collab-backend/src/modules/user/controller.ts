import express from "express";
import { iUserService } from "./iUserService";
import { UserService } from "./service";
import * as types from './types';
import { UserRepo } from "./repo";
import { responseHandler } from "../../handler/responsehandler";
import { eStatusCode } from "../../enum/status-code.enum";
import { eErrorMessage } from "../../enum/error-message.enum";

class UserController {
    private readonly userService: iUserService;
    constructor(userService: iUserService) {
        this.userService = userService;
        this.addUser = this.addUser.bind(this);
        this.getUsers = this.getUsers.bind(this);
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
            const response = await this.userService.addUser(payload)

            responseHandler(
                res,
                response.statusCode,
                response.isError,
                response.message,
                response?.data
            )
        } catch (error) {
            console.error(error);
            responseHandler(
                res,
                eStatusCode.INTERNAL_SERVER_ERROR,
                true,
                eErrorMessage.ServerError,
                error
            );
        }
    }

    async getUsers(
        req: express.Request,
        res: express.Response
    ): Promise<void> {
        try {
            const response = await this.userService.getUsers()
            responseHandler(
                res,
                response.statusCode,
                response.isError,
                response.message,
                response?.data
            )
        } catch (error) {
            console.error(error);
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
const userRepoInstance = new UserRepo()
const userServiceInstance = new UserService(userRepoInstance);
export default new UserController(userServiceInstance);