import ffmpegPath from "@ffmpeg-installer/ffmpeg";
import Ffmpeg from "fluent-ffmpeg";
import sharp from "sharp";

const ffPath = ffmpegPath.path;
Ffmpeg.setFfmpegPath(ffPath);

export const getBlurImage = async (fileToPress: Buffer | string): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    sharp(fileToPress)
      .blur(15)
      .toBuffer()
      .then(async (data) => {
        resolve(Buffer.from(data));
      })
      .catch(e => {
        reject(e)
      });
  });
};
