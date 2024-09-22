import bunyan, { LogLevel } from "bunyan";
import { envs } from "../../config";

const logger = bunyan.createLogger({
  name: "xcrush-dev",
  level: envs.LOG_LEVEL as LogLevel,
});

export default logger;
