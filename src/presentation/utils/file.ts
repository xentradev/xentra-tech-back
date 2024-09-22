import axios from "axios";

export const getFileFromUrl = async (url: string): Promise<string> => {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const photoB64 = Buffer.from(response.data, 'binary').toString(
        "base64"
      );
    return photoB64
}