import dotenv from "dotenv";
const dotenvResult = dotenv.config({ path: `.env.${process.env.ENVIRONMENT}` });
if (dotenvResult.error) {
    throw dotenvResult.error;
}
import express from "express";
import cors from "cors";
import compression from "compression";
import RouterConfig from "./src/routes";

const app: express.Application = express();
const port = process.env.PORT;

process.on('uncaughtException', (err) => {
    console.log('Woops! some error occored', err);
});

//adding middleware to parse all incoming request as JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//adding middleware to allow cross-origin request
app.use(cors());
//Compress all response
app.use(compression());

const routerConfig = new RouterConfig(app);
routerConfig.configureRoutes();

const runningMessage = `Server running at port: ${port}`;

app.listen(port, () => {
    console.log(runningMessage);
})