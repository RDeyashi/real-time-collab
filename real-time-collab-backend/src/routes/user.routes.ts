import express from "express";
import { CommonRouteConfig } from "./common.routes.config"
import UserController from "../modules/user/controller";

export class UserRoutes extends CommonRouteConfig {
    constructor(app: express.Application, basePath: string, version: string) {
        super(app, 'UserRoutes', basePath, version)
    }
    configureRoutes(): express.Application {
        this.app
            .route(`/${this.basePath}/${this.version}/users`)
            .post([
                UserController.addUser
            ])

        return this.app;
    }
}