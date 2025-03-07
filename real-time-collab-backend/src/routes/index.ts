import express from "express"
import { CommonRouteConfig } from "./common.routes.config";
import { UserRoutes } from "./user.routes";
const apiVersion = "v1";
const baseRoutePath = "api";

class RouterConfig {
    private app: express.Application;

    constructor(app: express.Application) {
        this.app = app;
    }

    configureRoutes(): Array<CommonRouteConfig>{
        const routes: Array<CommonRouteConfig> = [
            new UserRoutes(this.app, baseRoutePath, apiVersion)
        ]
        return routes;
    }
}

export default RouterConfig;