import resizeImage from "./imageResizer";
import { uploadImage } from "../../../../services/imageApi";

const IMAGE_MAX_SIZE_MB = 8;
const IMAGE_EXTENSION = "webp";

const randomName = () => {
  return `${Math.floor(Math.random() * 99999999)}-${Math.floor(Math.random() * 99999999)}`;
};

export const isImageAndValidSize = (file) => {
  const maxAllowedSizeInBytes = 1024 * (1024 * IMAGE_MAX_SIZE_MB);

  const isImageType = file.type.startsWith("image/");
  const isValidSize = file.size <= maxAllowedSizeInBytes;

  return { isImageType, isValidSize };
};

export const convertImage = async (file) => {
  const smallImgConfigs = [300, 300, IMAGE_EXTENSION, 80];
  const largeImgConfigs = [700, 700, IMAGE_EXTENSION, 80];

  const configs = [smallImgConfigs, largeImgConfigs];

  try {
    const promises = configs.map(async (config) => {
      const resizedImage = await resizeImage(file, ...config);
      return resizedImage;
    });

    const converted = await Promise.all(promises);
    return { data: converted, error: null };
  } catch (error) {
    return { data: null, error: "Conversions failed" };
  }
};

export const imageUploader = async (files) => {
  const name = randomName();
  const imageSmall = `${name}-small.${IMAGE_EXTENSION}`;
  const imageLarge = `${name}-large.${IMAGE_EXTENSION}`;

  const names = [imageSmall, imageLarge];

  try {
    const promises = files.map(async (data, index) => {
      const uploadedImage = await uploadImage(data, names[index]);
      return uploadedImage;
    });

    const uploaded = await Promise.all(promises);
    return { data: uploaded, error: null };
  } catch (error) {
    console.log("Uploading failed imageUploader");
    return { data: null, error: "Uploading images failed" };
  }
};
