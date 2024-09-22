import AWS from "aws-sdk";
import { envs } from "../../config";
import { Readable } from "stream";

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: envs.AWS_ACCESS_KEY_ID,
    secretAccessKey: envs.AWS_SECRET_ACCESS_KEY,
  },
});

const uploadFileToS3 = async (
  data: Buffer | Uint8Array | Blob | string | Readable,
  fileName: string
): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadParams = {
      Bucket: envs.AWS_STORAGE_BUCKET_NAME,
      Key: fileName,
      Body: data,
      ACL: "private",
    };
    return s3.upload(uploadParams)
      .promise()
      .then((data) => {
        resolve(decodeURIComponent(data.Location));
      })
      .catch((err) => reject(err));
  });
};

const S3Manager = {
  uploadFileToS3,
};

export default S3Manager;