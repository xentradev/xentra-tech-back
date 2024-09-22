import "dotenv/config";
import { get } from "env-var";

export const envs = {
  PORT: get("PORT").required().asPortNumber(),
  DATABASE_URL: get("DATABASE_URL").required().asString(),
  PROD: get("PROD").required().asBool(),
  FRONT_URL: get("FRONT_URL").required().asString(),
  OPEN_AI_API_KEY: get("OPEN_AI_API_KEY").required().asString(),
  ALLOWED_CORS: get("ALLOWED_CORS").required().asString(),
  JWT_SEED: get("JWT_SEED").required().asString(),
  LOG_LEVEL: get("LOG_LEVEL").required().asString(),

  AWS_ACCESS_KEY_ID: get("AWS_ACCESS_KEY_ID").required().asString(),
  AWS_SECRET_ACCESS_KEY: get("AWS_SECRET_ACCESS_KEY").required().asString(),
  AWS_STORAGE_BUCKET_NAME: get("AWS_STORAGE_BUCKET_NAME").required().asString(),
  WP_VERIFY_TOKEN: get("WP_VERIFY_TOKEN").required().asString(),
};
