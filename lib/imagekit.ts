import ImageKit from "imagekit";
import config from "./config";

const {
    env: {
        imageKit: { publicKey, privateKey, urlEndpoint },
    },
} = config;

export const imagekit = new ImageKit({
  publicKey: publicKey,
  privateKey: privateKey,
  urlEndpoint: urlEndpoint,
});