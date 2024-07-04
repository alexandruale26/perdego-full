import resizeImage from "./imageResizer";
import { IMAGE_MAX_SIZE_MB, IMAGE_EXTENSION } from "./consts";

export const isImageAndValidSize = (file) => {
  const maxAllowedSizeInBytes = 1024 * (1024 * IMAGE_MAX_SIZE_MB);

  const fileExists = !!file;
  const isImageType = fileExists && file.type.startsWith("image/");
  const isValidSize = fileExists && file.size <= maxAllowedSizeInBytes;

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
