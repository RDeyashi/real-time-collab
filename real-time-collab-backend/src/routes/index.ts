import express from "express"
import { CommonRouteConfig } from "./common.routes.config";
const apiVersion = "v1";
const baseRoutePath = "api";

class RouterConfig {
    private app: express.Application;

    constructor(app: express.Application) {
        this.app = app;
    }

    configureRoutes(): Array<CommonRouteConfig>{
        const routes: Array<CommonRouteConfig> = []
        return routes;
    }
}

export default RouterConfig;