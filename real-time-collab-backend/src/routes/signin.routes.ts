import express from "express";
import { CommonRouteConfig } from "./common.routes.config";
import SigninController from "../modules/signin/controller"

export class SigninRoutes extends CommonRouteConfig {
    constructor(app: express.Application, basePath: string, version: string) {
        super(app, 'UserRoutes', basePath, version)
    }

    configureRoutes(): express.Application {
        this.app
            .route(`/${this.basePath}/${this.version}/signin`)
            .post([
                SigninController.signin
            ])

        return this.app;
    }
}