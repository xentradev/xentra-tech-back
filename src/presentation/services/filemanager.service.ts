import AWS from "aws-sdk";
import axios from "axios";
import { v4 } from "uuid";
import { envs } from "../../config";
import { CustomError } from "../../domain";
import S3Manager from "../utils/s3";

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: envs.AWS_ACCESS_KEY_ID,
    secretAccessKey: envs.AWS_SECRET_ACCESS_KEY,
  },
});

const FOLDER = "generic-ai/";

export class FileManagerService {
  constructor() {}

  public async uploadFileToS3(url: string, name: string): Promise<string> {
    try {
      const response = await axios(url, {
        responseType: "text",
        responseEncoding: "base64",
      });

      const base64 = Buffer.from(response.data, "base64");
      const fileName = `${v4()}.png`;

      const fileURL = await S3Manager.uploadFileToS3(base64, FOLDER + fileName);

      return fileURL;
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  public async uploadFileToS3B64(b64: String): Promise<string> {
    try {
      const base64 = Buffer.from(b64, "base64");
      const fileName = `${v4()}.png`;
      let fileURL = await S3Manager.uploadFileToS3(base64, FOLDER + fileName);

      return fileURL;
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  public async uploadB64FileToS3(b64: Buffer): Promise<string> {
    try {
      const fileName = `${v4()}.png`;

      let fileURL = await S3Manager.uploadFileToS3(b64, FOLDER + fileName);
      if (envs.PROD) {
        fileURL = fileURL.replace(
          "xcrush-dev.s3.amazonaws.com",
          "d1znn43udvfjm3.cloudfront.net"
        );
      }

      return fileURL;
    } catch (error) {
      throw CustomError.internalServerError(`${error}`);
    }
  }

  async getFileFromS3({ fileId }: { fileId: string }) {
    try {
      const getObjectParams = {
        Bucket: envs.AWS_STORAGE_BUCKET_NAME,
        Key: "xcrush/" + fileId,
      };
      const headData = await s3.headObject(getObjectParams).promise();

      return {
        stream: s3.getObject(getObjectParams).createReadStream(),
        headObject: headData,
      };
    } catch (err: any) {
      throw CustomError.notFound("S3 error: " + err);
    }
  }
}
