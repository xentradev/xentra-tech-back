import bodyParser from "body-parser";
import cors from "cors";
import express, { Router } from "express";
import fileUpload from "express-fileupload";
import path from "path";
import { init } from "@amplitude/analytics-node";
import morgan from "morgan";
import { envs } from "../config";
import logger from "./utils/logger";

interface Options {
  port: number;
  routes: Router;
  allowedCors: any;
  public_path?: string;
}

const MAX_FILE_SIZE_MB = 60;
const MAX_FILE_SIZE_B = MAX_FILE_SIZE_MB * 1024 * 1024;

export class Server {
  public readonly app = express();
  private serverListener?: any;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: Router;
  private readonly allowedCors: string[];

  constructor(options: Options) {
    const { port, routes, public_path = "public", allowedCors } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
    this.allowedCors = allowedCors;
  }

  async start() {
    //* Middlewares
    //this.app.use(express.json()); // raw
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded
    this.app.use(
      fileUpload({
        limits: { fileSize: MAX_FILE_SIZE_B },
      })
    );
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(
      bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 50000,
      })
    );

    //* Public Folder
    this.app.use(express.static(this.publicPath));

    //* CORS
    const allowedRoutes = this.allowedCors;
    /*this.app.use(
      cors({
        origin: function (origin, callback) {
          if (!origin) return callback(null, true);
          if (allowedRoutes.indexOf(origin) === -1) {
            var msg =
              "The CORS policy for this site does not " +
              "allow access from the specified Origin.";
            return callback(new Error(msg), false);
          }
          return callback(null, true);
        },
      })
    );*/
    this.app.use(
      cors({
        origin: "*", // Permite todos los orígenes
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Métodos HTTP permitidos
        preflightContinue: false,
        optionsSuccessStatus: 204
      })
    );

    this.app.use(
      morgan("combined", {
        skip: function (req, res) {
          if (envs.LOG_LEVEL === "info") {
            return false;
          }
          return res.statusCode < 400;
        },
      })
    );

    //* Routes
    this.app.use(this.routes);

    //* SPA /^\/(?!api).*/  <== Únicamente si no empieza con la palabra api
    this.app.get("*", (req, res) => {
      const indexPath = path.join(
        __dirname + `../../../${this.publicPath}/index.html`
      );
      res.sendFile(indexPath);
    });

    this.serverListener = this.app.listen(this.port, () => {
      logger.info(`Server running on port ${this.port}`);
    });
  }

  public close() {
    this.serverListener?.close();
  }
}
