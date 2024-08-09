import imageResizer from "./imageResizer";
import { uploadToStorage } from "../../services/imageApi";

const generateImageName = () => {
  return `${Math.floor(Math.random() * 99999999)}-${Math.floor(Math.random() * 99999999)}`;
};

export default async (file) => {
  try {
    const convertedImage = await imageResizer(file);
    const uploadedPath = await uploadToStorage(
      convertedImage,
      `${generateImageName()}.webp`,
    );

    return { data: uploadedPath, success: true };
  } catch (error) {
    return { data: error.message, success: false };
  }
};
